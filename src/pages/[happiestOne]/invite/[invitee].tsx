import { useRouter } from 'next/router';
import Head from 'next/head';
import '@/app/globals.css';
import {useEffect, useRef, useState} from "react";
import iconVercel from "@/assets/svg/vercel.svg";
import iconMongoDB from "@/assets/svg/mongodb.svg";
import iconNextJS from "@/assets/svg/nextjs.svg";

const InvitePage = () => {
    const title: string = "The Happiest One - Osa & Yosi";
    const router = useRouter();
    const {happiestOne, invitee} = router.query as {happiestOne: string, invitee: string}
    if (happiestOne && !['osa-yosi', 'osayosi'].includes(happiestOne.toLowerCase())) {
        router.push('/');
    }


    const [attendance, setAttendance] = useState({});
    const [isAtdncLoading, setAtdncLoading] = useState(true);

    const [greetings, setGreetings] = useState([]);
    const [isGreetLoading, setGreetLoading] = useState(true);
    useEffect(() => {

        const fetchAttendance = async (invitee:string) => {
            try {
                const res = await fetch(`/api/attendance?isActive=true&name=${invitee}`);
                const data = await res.json();
                if (data && data.data) {
                    setAttendance(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch attendance:", error);
            } finally {
                setAtdncLoading(false);
            }
        };

        const fetchGreetings = async () => {
            try {
                const res = await fetch('/api/greetings');
                const data = await res.json();
                if (data && data.data) {
                    setGreetings(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch greetings:", error);
            } finally {
                setGreetLoading(false);
            }
        };

        invitee && fetchAttendance(invitee);
        invitee && fetchGreetings();
    }, [router.query]);



    // State untuk menyimpan data form
    const [name, setName] = useState('Aruman');
    const [presence, setPresence] = useState('absent');
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState('');

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Mencegah reload halaman

        // Data yang akan dikirim ke API
        const data = {
            name,
            presence,
            isActive
        };

        try {
            // Mengirim data ke API handler menggunakan fetch
            const response = await fetch(`/api/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Attendance successfully added');
                // Reset form setelah sukses
                setName('');
                setPresence('');
                setIsActive(false);
            } else {
                setMessage('Failed to add attendance');
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
            setMessage('An error occurred');
        }
    };

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
                <div className={`mobile bg-[#071b54]`}>


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


                    <div className={`p-6 flex flex-col items-center gap-2`}>
                        <div className={`text-2xl`}>RSVP</div>
                        <div>
                            <div></div>
                        </div>
                        <div className={`w-full`}>
                            <form onSubmit={handleSubmit}>
                                <button type={`submit`} className={`rounded bg-white text-slate-800 py-2 w-full hover:bg-slate-300`}>Konfirmasi</button>
                            </form>
                        </div>
                    </div>

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