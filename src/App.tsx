import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

import { api } from './services/api';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/Form/CreateAdModal';
import { GameBannerCard } from './components/Form/GameBannerCard';
import { CreateAdBanner } from './components/Form/CreateAdBanner';

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
    api.get('http://localhost:3333/games').then(response => {
        setGames(response.data);
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
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}