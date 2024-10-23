import { useRouter } from 'next/router';
import Head from 'next/head';
import '@/app/globals.css';
import { useRef } from "react";
import iconVercel from "@/assets/svg/vercel.svg";
import iconMongoDB from "@/assets/svg/mongodb.svg";
import iconNextJS from "@/assets/svg/nextjs.svg";

const InvitePage = () => {
    const title: string = "The Happiest One - Osa & Yosi";
    const router = useRouter();
    const { 'happiest-one': happiestOne, name } = router.query as { 'happiest-one': string, name: string };
        if (happiestOne && !['osa-yosi', 'osayosi'].includes(happiestOne.toLowerCase())) {
            router.push('/');
        }

        console.log(iconNextJS);
    const audioRef = useRef<HTMLAudioElement>(null);
    const playAudio = () => {
        audioRef.current?.play();
    };

    const pauseAudio = () => {
        audioRef.current?.pause();
    };
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={`w-full h-full flex text-xs md:text-sm`}>
                <div className={`desktop-foreground`}>Ini Tidak Terlihat</div>
                <div className={`mobile bg-amber-500`}>


                    <div>
                        <h1>Welcome to {happiestOne}`s invite page!</h1>
                        <p>Hey {name}, you`re invited!</p>
                    </div>
                    <div className={`flex text-sky-300 gap-2`}>
                        <div>Play</div>
                        | <div>Pause</div>
                    </div>
                    <audio ref={audioRef} src={`/audio/song1.mp3`} />
                    <button onClick={playAudio}>Play</button>
                    <button onClick={pauseAudio}>Pause</button>

                    {/*   FOOTER    */}
                    <div className={`flex flex-col gap-2`}>
                        <div className={`flex justify-center`}>Wholeheartedly crafted by <a href={`https://www.instagram.com/hiaruman`} target={`_blank`} className={`cursor-pointer font-bold ms-1`}>Aruman</a></div>
                        <div className={`flex justify-center`}>Powered By</div>
                        <div className={`flex justify-center`}>
                            <div className="cursor-pointer flex items-center">
                                <a href="https://vercel.com/" target="_blank" title="Vercel">
                                    <img width="20" src={iconVercel.src} alt={`Vercel`}/>
                                </a>
                            </div>
                            <div className="cursor-pointer flex items-center">
                                <a href="https://www.mongodb.com/" target="_blank" title="Mongodb">
                                    <img width="20" src={iconMongoDB.src} alt={`MongoDB`}/>
                                </a>
                            </div>
                            <div className="cursor-pointer flex items-center">
                                <a href="https://nextjs.org/" target="_blank" title="Next.js">
                                    <img width="60" src={iconNextJS.src} alt={`Next.js`}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default InvitePage;