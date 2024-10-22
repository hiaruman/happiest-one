import { useRouter } from 'next/router';
import Head from 'next/head';

const InvitePage = () => {
    const title: string = "The Happiest One - Osa & Yosi";
    const router = useRouter();
    const { 'happiest-one': happiestOne, name } = router.query as { 'happiest-one': string, name: string };
        if (happiestOne && !['osa-yosi', 'osayosi'].includes(happiestOne.toLowerCase())) {
            router.push('/');
        }
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
            <h1>Welcome to {happiestOne}`s invite page!</h1>
                <p>Hey {name}, you`re invited!</p>
            </div>
        </>
    );
};

export default InvitePage;