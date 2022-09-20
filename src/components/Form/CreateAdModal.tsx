import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { api } from '../../services/api';

import { Check, GameController } from 'phosphor-react';
import { Input } from '../Input';
import { FormEvent, useEffect, useState } from 'react';

interface Game {
  id: string;
  title: string;
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao criar o anúncio!');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Overlay className='overflow-y-auto'>
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-8 text-white top-0 md:top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-lg w-full md:w-[480px] h-screen md:h-min shadow-lg shadow-black/25 overflow-y-auto box-border">
        <Dialog.Title className="text-2xl md:text-3xl font-black text-center">Publique um anúncio</Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <select
                name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">Selecione o game que deseja jogar</option>

                {games.map(game => {
                  return <option key={game.id} value={game.id}>{game.title}</option>
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual o seu Discord?</label>
                <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col flex-1 gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="flex flex-wrap md:grid md:grid-cols-4 gap-2 md:w-[230px]"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-12 h-12 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-12 h-12 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-12 h-12 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-12 h-12 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-12 h-12 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-12 h-12 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-12 h-12 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex flex-col md:flex-row justify-end gap-4">
              <Dialog.Close
                type="button"
                className="order-1 md:order-0 bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 text-center"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="order-0 md:order-1 bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 justify-center"
              >
                <GameController className="w-6 h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
