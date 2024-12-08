import Link from 'next/link';
import { defaultIcons, defaultImages } from '@/constants/icons';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className = 'container'>
                <div className = 'left'>
                    <div className = 'logo'>
                        <img src = { defaultImages.logo } width = {40} height = {60} />
                        <h1>FeelTok</h1>
                    </div>
                    <div className = 'links'>
                        <Link href = '/dashboard'>Home</Link>
                        <Link href = '/dashboard/users'>Users</Link>
                        <Link href = '/dashboard/posts'>Post</Link>
                    </div>
                    <div className = 'logout'>
                        <Link href = '/'>
                            <div className = "logout-content">
                                <img src = { defaultIcons.logout } width = {18} height = {18} />
                                <span>Log Out</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className = 'right'>
                    {children}
                </div>
            </div>

            <style>
                {`
                    html, body {
                        height: 100%;
                        margin: 0;
                        overflow: hidden;
                        font-family: Arial, sans-serif;
                    }

                    .container {
                        display: flex;
                        height: 100vh;
                        padding: 0;
                    }

                    .left {
                        width: 15%;
                        background-color: #D2DCF0;
                        padding: 50px 0 50px 0;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        text-align: center;
                    }

                    .logo {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 20px;
                        display: block;
                    }

                    .logo h1 {
                        font-size: 28px;
                        font-weight: bold;
                    }
                        
                    .links a {
                        display: block;
                        padding: 10px;
                        margin-bottom: 10px;
                        color: black;
                        text-decoration: none;
                        text-align: center;
                        border-radius: 5px;
                        transition: background-color color 0.3s ease;
                    }

                    .links a:hover {
                        background-color: black;
                        color: white;
                    }

                    .links a:active {
                        background-color: black;
                        color: white;
                    }

                    .logout a {
                        padding: 10px;
                        color: red;
                        text-decoration: none;
                        text-align: center;
                        border-radius: 5px;
                    }

                    .logout-content {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                    }

                    .right {
                        flex: 1;
                        background-color: #EDF2F9;
                        padding: 20px;
                        box-sizing: border-box;
                    }
                `}
            </style>
        </>
    );
}
