function Home() {
    return (
        <main className="p-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="flex cursor-grab items-center justify-center rounded-lg bg-gray-100 p-6 text-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                    Card 1
                </div>
                <div className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-6 text-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                    Card 2
                </div>
                <div className="flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-100 p-6 text-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                    Card 3
                </div>
                <div className="flex cursor-crosshair items-center justify-center rounded-lg bg-gray-100 p-6 text-lg text-gray-900 dark:bg-gray-700 dark:text-white">
                    Card 4
                </div>
            </div>
        </main>
    );
}

export default Home;