export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <p>Navbar</p>
            {children}
            <p>Footer</p>
        </div>
    )
}
