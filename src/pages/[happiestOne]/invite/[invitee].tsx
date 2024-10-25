import { useRouter } from 'next/router';
import Head from 'next/head';
import '@/app/globals.css';
import React, {useEffect, useRef, useState} from "react";
import iconVercel from "@/assets/svg/vercel.svg";
import iconMongoDB from "@/assets/svg/mongodb.svg";
import iconNextJS from "@/assets/svg/nextjs.svg";
import iconUp from "@/assets/svg/arrow-up.svg";

const InvitePage = () => {
    const title: string = "The Happiest One - Osa & Yosi";
    const router = useRouter();
    const {happiestOne, invitee} = router.query as {happiestOne: string, invitee: string}
    if (happiestOne && !['osa-yosi', 'osayosi'].includes(happiestOne.toLowerCase())) {
        router.push('/');
    }

    const presences = [{
        label: 'Konfirmasi Kehadiran',
        value: ''
    }, {
        label: 'Tidak Tahu',
        value: 'tentative'
    }, {
        label: 'Tidak Hadir',
        value: 'absent'
    }, {
        label: 'Hadir',
        value: 'present'
    }]
    const [selectedPresence, setSelectedPresence] = useState({label:'Konfirmasi Kehadiran', value:''});

    const [attendance, setAttendance] = useState({});
    const [isAtdncLoading, setAtdncLoading] = useState(true);
    const [attendanceId, setAttendanceId] = useState();
    const [greetings, setGreetings] = useState([]);
    const [isGreetLoading, setGreetLoading] = useState(true);

    // State untuk menyimpan data form
    const [presence, setPresence] = useState(selectedPresence.value);
    const [isActive, setIsActive] = useState(true);
    const [message, setMessage] = useState('');
    useEffect(() => {

        const fetchAttendance = async (invitee:string) => {
            try {
                const res = await fetch(`/api/attendance?isActive=true&name=${invitee}`);
                const data = await res.json();
                if (data && data.data) {
                    setAttendance(data.data);
                    presences.forEach((x) => {
                        if (x.value===data.data.presence) {
                            setSelectedPresence(x);
                            setPresence(x.value);
                        }
                    })
                    setAttendanceId(data.data['_id']);
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


    // Fungsi untuk menangani submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Mencegah reload halaman

        if (!invitee || !presence) return;
        // Data yang akan dikirim ke API
        const data = {
            invitee,
            presence,
            isActive,
            attendanceId
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
                    setMessage('Attendance successfully updated');
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

    const handleOnChange = (e: any) => {
        const tempStore = JSON.parse(JSON.stringify(presences.filter((x) =>(x.value===e.target.value))));
        if (tempStore.length>0) {
            console.log('Bener kan ya? ', tempStore[0]);
            setSelectedPresence(tempStore[0]);
            setPresence(tempStore[0].value);
        }
    }

    const handleSubmitMessage = (e : any) => {
        e.preventDefault();
    }
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={`w-full h-full flex text-xs md:text-sm`}>
                <div className={`desktop-foreground`}>Ini Tidak Terlihat</div>
                <div className={`mobile bg-[#000000]`}>


                    <div>
                        <h1>Welcome to {happiestOne}`s invite page!</h1>
                        <p>Hey {invitee}, you`re invited!</p>
                    </div>
                    <div className={`flex text-sky-300 gap-2`}>
                        <div>Play</div>
                        | <div>Pause</div>
                    </div>
                    <audio ref={audioRef} src={`/audio/song1.mp3`}/>
                    <button onClick={playAudio}>Play</button>
                    <button onClick={pauseAudio}>Pause</button>

                    <div className="mt-20px text-white ibm-plex-sans fs-12 text-center px-10px">Google Maps</div>

                    <div className="p-6">
                            <iframe className={`w-full rounded-t`}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.21969831235202!2d109.05636349373563!3d-7.518647191774238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656599ddda4d47%3A0xb6906e33f67bab19!2sGBI%20Shalom%20Wangon!5e0!3m2!1sid!2sid!4v1729760721809!5m2!1sid!2sid"
                                    allowFullScreen={true} loading="lazy" width="480" height="240"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <a href="https://maps.app.goo.gl/tBtovwdC8mfLFfjr6" target="_blank">
                                <div className={`w-full py-3 rounded-b bg-[#f8f7f7] text-slate-700 text-center`}>Buka
                                    peta
                                </div>
                            </a>
                    </div>

                    <div className="mt-20px text-white ibm-plex-sans fs-12 text-center px-10px">Google Maps</div>

                    <div className="p-6">
                            <iframe className={`w-full rounded-t`}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.075867522704!2d109.23294622006077!3d-7.4316319059326394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fcbe5ab4811%3A0xf10047ad2dcd603a!2sConvention%20Hall%20Komplek%20Menara%20Pandang!5e0!3m2!1sid!2sid!4v1729759824849!5m2!1sid!2sid"
                                    allowFullScreen={true} loading="lazy" width="480" height="240"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <a href="https://maps.app.goo.gl/Pp4d2MacVDEozaJk8" target="_blank">
                                <div className={`w-full py-3 rounded-b bg-[#f8f7f7] text-slate-700 text-center`}>Buka peta</div>
                            </a>
                    </div>

                    {/*    RSVP    */}
                    <section>
                        <div className={`p-6 flex flex-col items-center gap-2`}>
                            <div className={`text-2xl`}>RSVP</div>
                            <div className={`w-full`}>
                                <select
                                    className={`w-full p-2.5 rounded-lg appearance-none text-center ${selectedPresence.value === presences[1].value ? 'bg-gold text-chiblack' : (selectedPresence.value === presences[2].value ? 'bg-red-700 text-white' : (selectedPresence.value === presences[3].value ? 'bg-green-700 text-white' : 'bg-slate-300 text-slate-600'))}`}
                                    value={selectedPresence.value}
                                    onChange={(e) => {
                                        const selected = JSON.parse(JSON.stringify(presences.find(p => p.value === e.target.value)));
                                        setSelectedPresence(selected); // Update the selected presence
                                    handleOnChange(e)
                                }}>
                                    {presences.map((p) => (
                                        <option key={p.value} value={p.value}>{p.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={`w-full`}>
                                <form onSubmit={handleSubmit}>
                                    <button type={`submit`}
                                            className={`rounded-lg bg-gold text-chiblack py-2 w-full hover:bg-amber-500`}>Konfirmasi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                    {/*    RSVP    */}
                    <section>
                        <div className={`p-6 flex flex-col items-center gap-2`}>
                            <div className={`text-2xl`}>Pesan</div>
                            <div className={`w-full py-2 flex flex-col gap-2 bg-slate-900 rounded-lg`}>
                                <div className={`px-2 border-b-2 border-b-slate-800 overflow-y-auto max-h-[315px]`}>

                                    {[{},{},{},{},{},{},{},{},{},{},{}].map((x) => (
                                        <>
                                            <div className={`flex flex-col`}>
                                                <div className={`flex justify-between items-center`}>
                                                    <div className={`text-amber-400 font-semibold`}>Nama</div>
                                                    <div className={`text-xs text-slate-400`}>waktu</div>
                                                </div>
                                                <div className={`pt-1 pb-2`}>pesan</div>
                                            </div>
                                        </>
                                    ))}


                                </div>
                                <div className={`px-2`}>
                                    <form onSubmit={handleSubmitMessage}>
                                        <div>
                                            <input className={`w-full rounded px-3 py-2 text-gold bg-slate-800`}
                                                   placeholder={'Nama'}/>
                                        </div>
                                        <div className={`mt-2 flex`}>
                                            <textarea rows={1}
                                                      className={`bg-slate-800 w-full rounded-l pl-3 py-2`}
                                                      style={{
                                                          resize: 'none',
                                                          outline: 'transparent'
                                                      }}></textarea>
                                            <div className={`rounded-r bg-slate-800 p-2 flex justify-end items-center`}>
                                                <button type={`submit`}
                                                        className={`rounded-full bg-gold w-8 h-8 text-chiblack hover:bg-amber-500`}>
                                                    <img className={`ms-1`} style={{width: '24px', height: '24px'}}
                                                         src={iconUp.src}/>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*   FOOTER    */}
                    <section id={`footer`}>
                        <div className={`flex flex-col gap-2 pb-24 text-gold`}>
                            <div className={`flex justify-center`}>Wholeheartedly crafted by <a
                                href={`https://www.instagram.com/hiaruman`} target={`_blank`}
                                className={`cursor-pointer font-bold ms-1`}>Aruman</a></div>
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
                    </section>
                </div>
            </div>

        </>
    );
};

export default InvitePage;