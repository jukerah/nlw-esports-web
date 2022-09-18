import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBannerCard } from './components/GameBannerCard';
import { CreateAdBanner } from './components/CreateAdBanner';
import { DiscordLogo, GameController } from 'phosphor-react';
import { Input } from './components/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logotipo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-gradient-to-r text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game: Game) => {
          return (
            <GameBannerCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}       
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[4 80px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3x1 font-black'>Publique um anúncio</Dialog.Title> 

            
            <form action="" className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>qual o game?</label>
                <Input id="game" type="text" placeholder="Selecione o game que deseja jogar"
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlating">Joga a quantos anos?</label>
                  <Input id="yearsPlating" type="number" placeholder="Tudo bem ser Zero" />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu discord?</label>
                  <Input id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Domingo"
                    >
                      D
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Segunda"
                    >
                      S
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Terça"
                    >
                      T
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Quarta"
                    >
                      Q
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Quinta"
                    >
                      Q
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Sexta"
                    >
                      S
                    </button>
                    <button
                      className='w-12 h-12 rounded bg-zinc-900' title="Sábado"
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="HourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="HourStart" type="time" placeholder="De" />
                    <Input id="HourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close
                  type="button"
                  className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className='bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}