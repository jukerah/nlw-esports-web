interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBannerCard = (props: GameBannerProps) => {
  return (
    <div>
      <a className='relative rounded-lg overflow-hidden' href="">
        <img src={props.bannerUrl} alt={`Banner do jogo ${props.title}`} />

        <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
          <strong className='text-base font-bold text-white block'>{props.title}</strong>
          <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>
        </div>
      </a>
    </div>
  );
}