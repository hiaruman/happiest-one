import { useRouter } from 'next/router';
import Head from 'next/head';
import '@/app/globals.css';
import React, {useEffect, useRef, useState} from "react";
import iconVercel from "@/assets/svg/vercel.svg";
import iconMongoDB from "@/assets/svg/mongodb.svg";
import iconNextJS from "@/assets/svg/nextjs.svg";
import iconUp from "@/assets/svg/arrow-up.svg";
import iconBCA from "@/assets/svg/bca-white.svg";
import iconBRI from "@/assets/svg/bri-white.svg";
import iconCopy from "@/assets/svg/copying.svg";
import theBride from "@/assets/img/Yosi 6.png";
import theGroom from "@/assets/img/Osa 6.png";
import OR2 from "@/assets/svg/OR2.2.svg";
import OR3 from "@/assets/svg/OR3.svg";
import OR4 from "@/assets/svg/OR4.svg";
import OR5 from "@/assets/svg/OR5.svg";
import OR6 from "@/assets/svg/OR6.svg";
import OR7 from "@/assets/svg/OR7.svg";
import OR8 from "@/assets/svg/OR8.svg";
import turntable from "@/assets/svg/turntable.svg";
import vinyl from "@/assets/svg/vinyl.svg";
import arrowLeft from "@/assets/svg/arrow-left.svg";
import arrowRight from "@/assets/svg/arrow-right.svg";
import {SvgSpinners180Ring} from "@/shared/components/spinner";
import Image, {StaticImageData} from "next/image";
import {galleries, groupIntoPairs} from "@/core/constant/galleries";
import bgImage1 from "@/assets/img/bg-1-min.jpg";
import bgImage2 from "@/assets/img/bg-2-min.jpg";
import bgImage3 from "@/assets/img/bg-3-min.jpg";
import Countdown from "@/shared/components/countdown";

interface Gallery {
    order: number;
    path: string;
    module: StaticImageData;
}

const InvitePage = () => {
    const title: string = "The Happiest One - Osa & Yosi";
    const router = useRouter();
    const {happiestOne, invitee} = router.query as {happiestOne: string, invitee: string}
    if (happiestOne && !['osa-yosi', 'osayosi', 'yosi-osa', 'yosiosa'].includes(happiestOne.toLowerCase())) {
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
    const [flashMessage, setFlashMessage] = useState('');

    const nameRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

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
                setAtdncLoading(false);
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
    const updateStatusAttendance = async (inputPresence: string | undefined) => {

        if (!invitee) return;
        // Data yang akan dikirim ke API
        const data = {
            invitee,
            presence: inputPresence ? inputPresence: presence,
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
    const [isAudioPlaying, setAudioPlaying] = useState(false);
    const [rotation, setRotation] = useState(0);
    let rad :number = 0, rotate:string = `rotate(${rad}deg)`;
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const toggleAudio = () => {
        setAudioPlaying((a:boolean) => !a);
        isAudioPlaying ?  audioRef.current?.pause() : audioRef.current?.play();
    }
    useEffect(() => {
        if (isAudioPlaying) {
            intervalRef.current = setInterval(() => {
                setRotation( rotation + 1);
                rad+=1;
                rotate = `rotate(${rad}deg)`;
                const El: HTMLElement | null = document.getElementById('vinyl');
                if (El) El.style.transform = `rotate(${rad}deg)`;
            }, 10);
        } else if (intervalRef.current) {
            const El: HTMLElement | null = document.getElementById('vinyl');
            rad = parseInt(El?.style.transform.match(/\d/g)?.join("") as string);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [isAudioPlaying, rad])

    const handleOnChange = (e: any) => {
        const tempStore = JSON.parse(JSON.stringify(presences.filter((x) =>(x.value===e.target.value))));
        if (tempStore.length>0) {
            setSelectedPresence(tempStore[0]);
            setPresence(tempStore[0].value);
            updateStatusAttendance(tempStore[0].value).then(r => {});
        }
    }

    const handleSubmitMessage = async (e : any) => {
        e.preventDefault();
        const name = nameRef.current ? (nameRef.current as any).value : '';
        const note = noteRef.current ? (noteRef.current as any).value : '';
        if ([undefined, null, ''].includes(name) || [undefined, null, ''].includes(note)) return;
        // Data yang akan dikirim ke API

        const data = {
            name,
            note
        };
        try {
            // Mengirim data ke API handler menggunakan fetch
            const response = await fetch(`/api/greetings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                nameRef.current ? (nameRef.current as any).value = '' : '';
                noteRef.current ? (noteRef.current as any).value = '' : '';
                setMessage('Greetings successfully updated');
                try {
                    const res = await fetch('/api/greetings');
                    const data = await res.json();
                    if (data && data.data) {
                        setGreetings(data.data);
                        const msg: string = 'Berhasil mengirim pesan';
                        showflashMessage(msg);
                        setTimeout(() => {
                            const messageBox: HTMLElement | null = document.getElementById('message-box');
                            if (messageBox) messageBox.scrollTop = messageBox.scrollHeight + 48;
                        }, 100);
                    }
                } catch (error) {
                    console.error("Failed to fetch greetings:", error);
                } finally {
                    setGreetLoading(false);
                }
            } else {
                setMessage('Failed to add greetings');
            }
        } catch (error) {
            console.error('Error submitting greetings:', error);
            setMessage('An error occurred');
        }
    }

    const dateStringify = (date:any) => {
        if (date) {
            const d = new Date(date);
            const curDate = new Date();
            const time = d.getTime();
            const curTime = curDate.getTime();
            const selisih = curTime - time;
            if (selisih < 60000) {
                return Math.floor(selisih / 1000) + ' detik yang lalu';
            } else if (selisih >= 60000 && selisih < 3600000) {
                return Math.floor(selisih / 60000) + ' menit yang lalu';
            } else if (selisih >= 3600000 && selisih < 86400000) {
                return Math.floor(selisih / 3600000) + ' jam yang lalu';
            } else if (selisih >= 86400000 && selisih < 604800000) {
                return Math.floor(selisih / 86400000) + ' hari yang lalu';
            } else if (selisih >= 604800000 && selisih < 2592000000) {
                return Math.floor(selisih / 604800000) + ' minggu yang lalu';
            } else if (selisih >= 2592000000 && selisih < 31536000000) {
                return Math.floor(selisih / 2592000000) + ' bulan yang lalu';
            } else if (selisih >= 31536000000) {
                return Math.floor(selisih / 31536000000) + ' tahun yang lalu';
            }
        }
    }

    const copyText = (e: any, txt: string) => {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = txt;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        const msg: string = 'Berhasil salin teks';
        showflashMessage(msg);
    }

    const showflashMessage = (txt:string) => {
        setFlashMessage(txt);
        setTimeout(() => {
            setFlashMessage('');
        }, 2500);
    }

    const [isModal, setModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState<Gallery>({
        order: 0,
        path:'',
        module:{
            src: '',
            blurWidth:0,
            blurHeight:0,
            height:0,
            width: 0
        }
    });

    const nextPreview = () => {
        let order = selectedGallery.order + 1;
        const lastOrder = galleries[galleries.length-1].order;
        if (order>lastOrder) order = 0;
        setSelectedGallery(galleries.filter((x: any) => (x.order===order))[0]);
    }

    const previousPreview = () => {
        let order = selectedGallery.order - 1;
        if (order<0) order = galleries[galleries.length-1].order;
        setSelectedGallery(galleries.filter((x: any) => (x.order===order))[0]);
    }

    const bgs = [bgImage1.src, bgImage2.src, bgImage3.src];
    const [index, setIndex] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // setIndex((prevIndex) => (prevIndex + 1) % bgs.length);
    //     }, 3000);
    // }, [index]);

    const gruppedGalleries = groupIntoPairs(galleries);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={`w-full h-full flex text-xs md:text-sm`}>

                {/*     Modal Backdrop    */}
                <div className={`absolute w-full h-full top-0 left-0 z-50 ${isModal ? '' : 'hidden'}`} style={{backgroundColor: `rgba(0,0,0,0.8)`, transition: `visibility 2s`}}>
                    <div className={`absolute text-white text-2xl right-6 top-6 cursor-pointer`} onClick={() => {
                        setModal(false);
                    }}>&#10005;</div>
                    <div className={`p-6 w-full h-full flex justify-center items-center`}>
                        <div className={'absolute left-6 rounded-full cursor-pointer'} onClick={() => {
                            previousPreview();
                        }} style={{backgroundColor: `rgba(255,255,255, 0.5)`}}>
                            <Image src={arrowLeft.src} alt={'left'} width={24} height={24}/>
                        </div>
                        <img className={'m-auto'} src={selectedGallery.module.src} alt={`Preview`} style={{width: `${((selectedGallery.module.width>selectedGallery.module.height) && (window.innerHeight>selectedGallery.module.height)) ? 'calc(100vw - 4.5rem)' : 'auto'} `, height: `${((selectedGallery.module.width<selectedGallery.module.height) && (window.innerWidth>selectedGallery.module.width)) ? 'calc(100vh - 6rem)' : 'auto'} `, maxWidth: `calc(100vw - 4.5rem)`,  maxHeight: `calc(100vh - 6rem)`}} />
                        <div className={`absolute right-6 rounded-full cursor-pointer`} onClick={() => {
                            nextPreview();
                        }} style={{backgroundColor: `rgba(255,255,255, 0.5)`}}>
                            <Image src={arrowRight.src} alt={'right'} width={24} height={24}/>
                        </div>
                    </div>
                </div>
                {/*     End of Modal Backdrop    */}

                <div className={`desktop-foreground relative`} style={{width: `calc(100% - 480px)`}}>
                    <img className={`w-full h-full object-cover object-right`} src={`/img/foreground.jpg`} alt={`Foreground`}/>
                    <div className={`w-2 h-full absolute right-0 bg-black opacity-50 top-0`}></div>
                    <div className={`w-full h-full absolute left-0 top-0`} style={{backgroundColor: `rgba(0, 0, 0, 0.4)`}}>
                        <section className={`my-20`}>
                            <div className={`px-6 flex flex-col items-center gap-6`} style={{maxWidth: `480px`}}>
                                <p className={`text-center leading-8`}>
                                    Sebab pada awal dunia, Allah menjadikan mereka laki-laki dan perempuan, sebab itu laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya,
                                    sehingga keduanya itu menjadi satu daging.
                                    <br/>
                                    Demikianlah mereka bukan lagi dua, melainkan satu.
                                    <br/>
                                    Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.
                                </p>
                                <div className={`cinzel-bold text-gold`}>MARKUS 10:6-9</div>
                            </div>
                        </section>
                    </div>
                </div>
                <div
                    className={`w-full max-w-[480px] absolute right-1/2 translate-x-1/2 min-[968px]:right-0 min-[968px]:translate-x-0`}
                    style={{height: '100vh'}}>
                    <div className={`${flashMessage ? 'flash-message' : 'hidden'}`}><span className={`p-2`}
                                                                                          onClick={() => {
                                                                                              setFlashMessage('');
                                                                                          }}>&#10005;</span><span className={`mr-4`}>{flashMessage}</span>
                    </div>
                    <div className={`absolute bottom-16 left-6 cursor-pointer z-[100]`} onClick={() => {
                        toggleAudio();
                    }}>
                        <div className={'w-10 h-10'}>
                            <audio ref={audioRef} src={`/audio/song1.mp3`}/>
                            <Image className={`absolute bottom-0 left-0 z-50`} src={turntable.src} width={40}
                                   height={40} style={{width: `40px`, height: `40px`}} alt={'Turntable'}/>
                            <Image id={`vinyl`} style={{transform: `rotate(${rad}deg)`, width: `40px`, height: `40px`}} src={vinyl.src} width={40}
                                   height={40} alt={'Vinyl'}/>
                        </div>
                    </div>
                    <div className={`mobile text-brown`} style={{
                        scrollbarGutter: 'stable',
                        backgroundImage: `url(${OR2.src})`,
                        backgroundPositionX: `center`,
                        backgroundColor: `#f3eee1`
                    }}>

                        <section className={`px-3 items-center mt-10 mb-10 flex flex-col relative`}>
                            <Image className={'absolute -top-10'} src={OR8.src} width={100} height={20} alt={'gutter'}
                                   style={{width: '80%'}}/>
                            <div className={`cinzel-bold text-gold text-3xl mt-32`}>Salam Sejahtera</div>
                        </section>
                        <section id={`couple`} className={`px-6 pb-16`}>
                            <div className={`flex flex-col items-center mb-8 gap-2`}>
                                <p className={`text-center leading-8`}>
                                    Tuhan membuat segala sesuatu indah pada waktu-Nya.<br/>
                                    Indah saat Dia mempertemukan kami,<br/>
                                    indah saat Dia menumbuhkan kasih di antara kami,<br/>
                                    dan indah saat Dia mempersatukan kami dalam<br/>
                                    suatu Ikatan Pernikahan Kudus<br/>
                                </p>
                            </div>
                            <div className={`flex justify-center mb-4`}>
                                <Image src={theBride.src} width={240} height={320} style={{width: `80%`}}
                                       alt={'The Bride'}/>
                            </div>
                            <div className={`flex items-center flex-col gap-2`}>
                                <div className={`ephesis font-bold text-center text-gold text-4xl`}>Yosiana Dwi Saputri,
                                    A.Md.Farm
                                </div>
                                <div>Putri kedua dari Bapak Priyoko & Ibu Sri Esti Rahayu</div>
                                <div>Sumbang, Banyumas</div>
                            </div>
                            <div className={`text-8xl playfair-display mb-12 mt-8 text-gold text-center`}>&</div>
                            <div className={`flex justify-center mb-4`}>
                                <Image src={theGroom.src} width={240} height={320} style={{width: `80%`}}
                                       alt={'The Groom'}/>
                            </div>
                            <div className={`flex flex-col items-center gap-2`}>
                                <div className={`ephesis font-bold text-gold text-4xl text-center`}>Dr (cand) Yohanes
                                    Osa Hamara, S.H., M.H.
                                </div>
                                <div className={`text-center`}>Putra pertama dari Bapak Antonius Rio Tripurboyo & Ibu
                                    Nur Endah Sumiati (Menuk)
                                </div>
                                <div className={`text-center`}>Wangon, Banyumas</div>
                            </div>

                        </section>

                        <section id={`countdown`} className={`w-full h-[480px] relative`}>
                            <div className={`w-full h-[480px] absolute top-0 left-0 flex justify-center items-end pb-6`}
                                 style={{backgroundColor: `rgba(0, 0, 0, 0.25)`}}>
                                <Countdown targetDate={`2024-11-24T11:00:00`}/>
                            </div>
                            <div className={`w-full h-full`} style={{
                                backgroundImage: `url(${bgs[index]})`,
                                backgroundPosition: `center`,
                                backgroundSize: `480px`,
                                transition: 'opacity 0.5s ease-in-out',
                            }}>
                            </div>
                        </section>

                        <section id={`events`} className={`px-6 py-16 flex flex-col gap-8`}>
                            <div className={`text-center`}>Yang akan diselenggarakan pada hari</div>
                            <div className={'flex gap-2 items-center cinzel-bold text-gold'}>
                                <div className={'w-full flex justify-center text-3xl'}>MINGGU</div>
                                <div className={'w-full flex justify-center text-4xl font-bold border-gold border-l-2 border-r-2'}>24</div>
                                <div className={'w-full flex flex-col items-center text-sm'}>
                                    <div>NOVEMBER</div>
                                    <div>2024</div>
                                </div>
                            </div>
                            <div className={`flex justify-center gap-3`}>
                                <div className={`w-full flex flex-col items-center justify-between gap-6`}>
                                    <div className={`flex flex-col items-center gap-4`}>
                                        <div className={`cinzel-bold text-gold text-xl text-center`}>PEMBERKATAN</div>
                                        <div className={`text-center`}>11.00 WIB s.d. selesai</div>
                                        <div className={`text-center`}>GBI Shalom Wangon <br/>(Khusus Keluarga & Jemaat Gereja)</div>
                                    </div>
                                    <button className={`px-3 py-2 border-2 text-gold border-gold rounded-lg`}>GOOGLE MAPS</button>
                                </div>
                                <div className={`border-l-2 border-gold`}></div>
                                <div className={`w-full flex flex-col items-center gap-6`}>
                                    <div className={`flex flex-col items-center gap-4`}>
                                        <div className={`cinzel-bold text-xl text-center text-gold`}>RESEPSI</div>
                                        <div className={`text-center`}>18.00 WIB s.d. 21.00 WIB</div>
                                        <div className={`text-center`}>Convention Hall Putra Sang Fajar <br/>(Pintu Timur
                                            depan gedung DPRD Kabupaten Banyumas)<br/>
                                            Komplek Menara Teratai Purwokerto
                                        </div>
                                    </div>
                                    <button className={`px-3 py-2 border-2 text-gold border-gold rounded-lg`}>GOOGLE MAPS</button>

                                </div>
                            </div>
                        </section>

                        <section className={`px-6`}>
                                <Image className={`mt-3 mb-2`} src={OR4.src} width={100} height={20}
                                       alt={'gutter'} style={{width: '100%'}}/>
                        </section>

                        <section className={`my-20`}>
                            <div className={`px-6 flex flex-col items-center gap-6`}>
                                <p className={`text-center leading-8 text-[#908f8e]`}>
                                Sebab pada awal dunia, Allah menjadikan mereka laki-laki dan perempuan, sebab itu
                                    laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya,
                                    sehingga keduanya itu menjadi satu daging.
                                    <br/>
                                    Demikianlah mereka bukan lagi dua, melainkan satu.
                                    <br/>
                                    Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.
                                </p>
                                <div className={`cinzel-bold text-gold`}>MARKUS 10:6-9</div>
                            </div>
                        </section>


                        {/*<div className="mt-20px text-white ibm-plex-sans fs-12 text-center px-10px">Google Maps</div>*/}

                        {/*<div className="p-6">*/}
                        {/*    <div className={`w-full h-[240px] bg-[#f8f7f7] rounded-t-lg`}>*/}
                        {/*        <iframe className={`w-full rounded-t-lg`}*/}
                        {/*                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.21969831235202!2d109.05636349373563!3d-7.518647191774238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656599ddda4d47%3A0xb6906e33f67bab19!2sGBI%20Shalom%20Wangon!5e0!3m2!1sid!2sid!4v1729760721809!5m2!1sid!2sid"*/}
                        {/*                allowFullScreen={true} loading="lazy" width="480" height="240"*/}
                        {/*                referrerPolicy="no-referrer-when-downgrade"></iframe>*/}
                        {/*    </div>*/}
                        {/*    <a href="https://maps.app.goo.gl/tBtovwdC8mfLFfjr6" target="_blank">*/}
                        {/*        <div className={`w-full py-3 rounded-b-lg bg-[#f8f7f7] text-slate-700 text-center`}>Buka*/}
                        {/*            peta*/}
                        {/*        </div>*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        {/*<div className="mt-20px text-white ibm-plex-sans fs-12 text-center px-10px">Google Maps</div>*/}

                        {/*<div className="p-6">*/}
                        {/*    <div className={`w-full h-[240px] bg-[#f8f7f7] rounded-t-lg`}>*/}
                        {/*        <iframe className={`w-full rounded-t-lg`}*/}
                        {/*                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.075867522704!2d109.23294622006077!3d-7.4316319059326394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fcbe5ab4811%3A0xf10047ad2dcd603a!2sConvention%20Hall%20Komplek%20Menara%20Pandang!5e0!3m2!1sid!2sid!4v1729759824849!5m2!1sid!2sid"*/}
                        {/*                allowFullScreen={true} loading="lazy" width="480" height="240"*/}
                        {/*                referrerPolicy="no-referrer-when-downgrade"></iframe>*/}
                        {/*    </div>*/}
                        {/*    <a href="https://maps.app.goo.gl/Pp4d2MacVDEozaJk8" target="_blank">*/}
                        {/*        <div className={`w-full py-3 rounded-b-lg bg-[#f8f7f7] text-slate-700 text-center`}>Buka*/}
                        {/*            peta*/}
                        {/*        </div>*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        {/*       GALLERY       */}
                        <section id={`gallery`} className={`px-6 mb-6`}>
                            <div className={`flex my-6 items-center justify-between`}>
                                <div><img src={OR5.src}/></div>
                                <div><img src={OR6.src} className={'auto'}/></div>
                                <div><img src={OR7.src}/></div>
                                <div
                                    className={`text-4xl font-bold text-gold italianno w-full text-center -mx-4`}>Memorizing
                                    Our Moments
                                </div>
                                <div><img src={OR5.src}/></div>
                                <div><img src={OR6.src} className={'auto'}/></div>
                                <div><img src={OR7.src}/></div>
                            </div>
                            <div className={`flex flex-col gap-3`}>
                                {gruppedGalleries && gruppedGalleries.map((gs, idx) => (
                                    <div key={idx}>
                                        <div className={`flex flex-wrap gap-3`}>
                                            {gs.map((g) => (
                                                <img key={g.order} src={g.path} style={{width: `calc(50% - 0.375rem)`}}
                                                     onClick={() => {
                                                         setModal(true);
                                                         setSelectedGallery(g);
                                                     }} className={`rounded-lg cursor-pointer`}/>
                                            ))}
                                        </div>
                                        <div>
                                            <Image className={`mt-3 mb-2`} src={OR4.src} width={100} height={20}
                                                   alt={'gutter'} style={{width: '100%'}}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={`flex my-6 items-center justify-between`}>
                                <div><img src={OR5.src}/></div>
                                <div><img src={OR6.src} className={'auto'}/></div>
                                <div><img src={OR7.src}/></div>
                                <div
                                    className={`text-sm font-bold text-brown text-center py-1 px-3 rounded-lg cursor-pointer`}
                                    style={{border: `1px solid #5a400f`}}>See More
                                </div>
                                <div><img src={OR5.src}/></div>
                                <div><img src={OR6.src} className={'auto'}/></div>
                                <div><img src={OR7.src}/></div>
                            </div>
                        </section>

                        {/*    RSVP    */}
                        <section>
                            <div className={`p-6 flex flex-col items-center gap-2`}>
                                <div className={`text-3xl font-bold text-gold cinzel-bold`}>RSVP
                                </div>
                                {(isAtdncLoading) && (
                                    <div className={`flex justify-center`}>
                                        <SvgSpinners180Ring/>
                                    </div>
                                )}
                                {(!isAtdncLoading) && (
                                    <div className={`w-full`}>
                                        <select
                                            className={`w-full cursor-pointer p-2.5 rounded-lg appearance-none text-center ${selectedPresence.value === presences[1].value ? 'bg-gold text-chiblack' : (selectedPresence.value === presences[2].value ? 'bg-red-700 text-white' : (selectedPresence.value === presences[3].value ? 'bg-green-700 text-white' : 'bg-slate-300 text-slate-600'))}`}
                                            value={selectedPresence.value}
                                            onChange={(e) => {
                                                const selected = JSON.parse(JSON.stringify(presences.find(p => p.value === e.target.value)));
                                                setSelectedPresence(selected); // Update the selected presence
                                                handleOnChange(e);
                                            }}>
                                            {presences.map((p) => (
                                                <option key={p.value} value={p.value}>{p.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </section>


                        {/*    Message    */}
                        <section>
                            <div className={`p-6 flex flex-col items-center gap-2`}>
                                <div className={`text-3xl font-bold text-gold`}
                                     style={{fontFamily: 'Cinzel Bold'}}>Pesan
                                </div>
                                <div className={`w-full py-4 flex flex-col gap-4 bg-[#efe5cf] rounded-lg`}>
                                    {(!greetings) && (
                                        <div className={`flex justify-center`}>
                                            <SvgSpinners180Ring/>
                                        </div>
                                    )}
                                    {(greetings && greetings.length > 0) && (
                                        <div id={`message-box`} className={`px-4 overflow-y-auto max-h-[290px] message`}
                                             style={{borderBottom: '1px solid #d2a339'}}>
                                            {greetings.map((g: any) => (
                                                <>
                                                    <div key={g['_id']} className={`flex flex-col`}>
                                                        <div className={`flex justify-between items-center`}>
                                                            <div
                                                                className={`text-black font-bold`}>{g.name}</div>
                                                            <div
                                                                className={`text-xs text-slate-400`}>{dateStringify(g.createdAt)}</div>
                                                        </div>
                                                        <div className={`pt-1 pb-2 text-xs`}>{g.note}</div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}

                                    <div className={`px-2`}>
                                        <form onSubmit={handleSubmitMessage}>
                                            <div>
                                                <input
                                                    className={`w-full rounded px-3 py-2 text-black font-bold bg-alabaster`}
                                                    ref={nameRef}
                                                    placeholder={'Nama'}
                                                    style={{outline: 'transparent'}}
                                                />
                                            </div>
                                            <div className={`mt-2 flex`}>
                                                <textarea rows={1}
                                                          className={`bg-alabaster w-full text-xs rounded-l pl-3 py-2`}
                                                          ref={noteRef}
                                                          placeholder={`Pesan`}
                                                          style={{
                                                              resize: 'none',
                                                              outline: 'transparent'
                                                          }}></textarea>
                                                <div
                                                    className={`rounded-r bg-alabaster p-2 flex justify-end items-center`}>
                                                    <button type={`submit`}
                                                            className={`rounded-full bg-gold w-8 h-8 text-chiblack hover:bg-amber-500`}>
                                                        <Image className={`ms-1`} height={24} width={24}
                                                               src={iconUp.src}
                                                               alt={`icon-up`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id={'gift'} className={`pt-10 px-6 flex flex-col gap-10 items-center`}>
                            <div className={`text-3xl font-bold text-gold`} style={{fontFamily: 'Cinzel Bold'}}>Hadiah
                            </div>
                            <div className={`text-center`}>Bagi bapak/ibu/saudara/i yang ingin mengirimkan hadiah
                                pernikahan
                                dapat melalui nomor rekening yang tertera di bawah
                            </div>
                            <div className={`flex flex-col gap-2 items-center`}>
                                <div>
                                    <Image width={72} height={24} className={`h-8`} style={{width: `auto`}}
                                           src={iconBCA.src} alt={`BCA`}/>
                                </div>
                                <div>a.n. Yohanes Osa Hamara</div>
                                <div className={`flex`}>0462168321 <span onClick={(e) => {
                                    copyText(e, `0462168321`)
                                }} className={`cursor-pointer ml-2`} title={`Salin`}><img src={iconCopy.src}
                                                                                          className={`h-4`}
                                                                                          alt={`copy`}/></span></div>
                            </div>
                            <div className={`flex flex-col gap-2 items-center`}>
                                <div>
                                    <Image width={72} height={24} style={{width: `auto`}} src={iconBRI.src}
                                           alt={`BRI`}/>
                                </div>
                                <div>a.n. Yosiana Dwi Saputri</div>
                                <div className={`flex`}>0077-0113-3939-505 <span onClick={(e) => {
                                    copyText(e, `0077-0113-3939-505`)
                                }} className={`cursor-pointer ml-2`} title={`Salin`}><img src={iconCopy.src}
                                                                                          className={`h-4`}
                                                                                          alt={`copy`}/></span></div>
                            </div>
                            <div className={'text-center w-full'}>
                                atau bagi bapak/ibu/saudara/i yang ingin mengirimkan hadiah pernikahan berupa fisik
                                dapat
                                ditujukan ke alamat berikut
                            </div>
                            <div className={`flex flex-col gap-4 items-center`}>
                                <div className={`font-bold`}>Kantor Hukum Hamara & Partners</div>

                                <div className={`flex items-center`}>
                                    <div className={`text-center w-full`}>
                                        Kantor Hukum Hamara & Partners. Jl. Profesor Dr. Soeharso (samping mie ayam
                                        tunggal
                                        rasa), Glempang, Bancarkembar, Kec. Purwokerto Utara, Kab. Banyumas, Jawa Tengah
                                        53114
                                    </div>
                                    <div onClick={(e) => {
                                        copyText(e,
                                            `Kantor Hukum Hamara & Partners. Jl. Profesor Dr. Soeharso (samping mie ayam tunggal rasa), Glempang, Bancarkembar, Kec. Purwokerto Utara, Kab. Banyumas, Jawa Tengah 53114`
                                        )
                                    }} className={`cursor-pointer ml-2 w-12`} title={`Salin`}>
                                        <img src={iconCopy.src} className={`h-4`} alt={`copy`}/>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={`px-3 items-center my-10 flex flex-col`}>
                            <Image src={OR3.src} width={100} height={20} alt={'gutter'} style={{width: '100%'}}/>
                        </section>

                        <section id={`closing`} className={`px-6`}>
                            <div className={`flex justify-center text-center`}>Bersama dengan kasih Tuhan, kami berharap
                                kehadiran dan doa dari Bapak/Ibu/Saudara/i pada momen penuh bahagia ini. Terima kasih
                                atas
                                perhatian dan kasih yang telah diberikan.
                            </div>
                            <div className={`text-center mt-8`}>The Happiest One</div>
                            <div className={`text-3xl flex gap-2 text-gold justify-center items-baseline`}><span
                                className={`cinzel-bold`}>Yosi</span><span
                                className={`playfair-display text-4xl`}>&</span><span
                                className={`cinzel-bold`}>Osa</span>
                            </div>
                        </section>

                        {/*   FOOTER    */}
                        <section id={`footer`}>
                            <div className={`flex flex-col gap-2 pt-24 pb-32`}>
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
            </div>

        </>
    );
};

export default InvitePage;