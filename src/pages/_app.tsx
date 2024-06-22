// pages/_app.tsx
import '../styles/globals.css';
import { AppProps } from 'next/app';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">Entry Control System</div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" legacyBehavior>
                                <a className="text-white hover:text-gray-200">Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/EmployeeReport" legacyBehavior>
                                <a className="text-white hover:text-gray-200">Employee Report</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/GuestReport" legacyBehavior>
                                <a className="text-white hover:text-gray-200">Guest Report</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="container mx-auto p-4">
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default MyApp;
