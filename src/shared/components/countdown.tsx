import React, {useState, useEffect, useMemo} from 'react';

interface CountdownProps {
    targetDate: string; // Tipe targetDate adalah string
}

// Definisikan tipe untuk objek timeLeft
interface TimeLeft {
    days: number | string;
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const target = useMemo(() => new Date(targetDate), [targetDate]);
    if (isNaN(target.getTime())) return; // Check validity of targetDate
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (isNaN(target.getTime())) return; // Cek validitas targetDate

        const updateCountdown = () => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days: (days<10) ? '0'+days : days, hours: (hours<10) ? '0'+hours : hours, minutes: (minutes<10) ? '0'+minutes : minutes, seconds: (seconds<10) ? '0'+seconds : seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId); // Bersihkan interval saat unmount
    }, [target]);

    // Jika targetDate tidak valid atau belum dimuat
    if (isNaN(target.getTime())) {
        return <div>Masukkan tanggal target yang valid dalam format: YYYY-MM-DDTHH:mm:ss</div>;
    }

    return (
        <div>
            <div className={`text-center mt-8`}>The Wedding of</div>
            <div className={`text-3xl flex gap-2 text-white justify-center items-baseline`}><span
                className={`cinzel-bold`}>Yosi</span><span
                className={`playfair-display text-4xl`}>&</span><span
                className={`cinzel-bold`}>Osa</span>
            </div>
            <div className={`flex gap-3 justify-center`}>
                <div className={'flex flex-col items-center gap-2'}>
                    <div className={`text-3xl font-bold px-2 py-3 rounded-lg`}
                         style={{backgroundColor: `rgba(255, 255, 255, 0.5)`}}>{timeLeft.days}
                    </div>
                    <div>Hari</div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <div className={`text-3xl font-bold px-2 py-3 rounded-lg`}
                         style={{backgroundColor: `rgba(255, 255, 255, 0.5)`}}>{timeLeft.hours}
                    </div>
                    <div>Jam</div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <div className={`text-3xl font-bold px-2 py-3 rounded-lg`}
                         style={{backgroundColor: `rgba(255, 255, 255, 0.5)`}}>{timeLeft.minutes}
                    </div>
                    <div>Menit</div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <div className={`text-3xl font-bold px-2 py-3 rounded-lg`}
                         style={{backgroundColor: `rgba(255, 255, 255, 0.5)`}}>{timeLeft.seconds}
                    </div>
                    <div>Detik</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
