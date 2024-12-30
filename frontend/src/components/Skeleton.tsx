export const Skeleton_landingPage = () => {
    return <div>

        <div role="status" className="max-width-screen-lg p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between px-80 h-20">
                <div>
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4 px-80 h-20">
                <div>
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4 px-80 h-20">
                <div>
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4 px-80 h-20">
                <div>
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4 px-80 h-20">
                <div>
                    <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

    </div>
}

export const Skeleton_BlogPage = () => {

    return (
        <div role="status" className="max-w-screen h-screen border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="grid grid-cols-12 px-36 pt-20 pb-20 h-screen">
                {/* Main Content Area */}
                <div className="col-span-8">
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                </div>

                {/* Author Section */}
                <div className="col-span-4 pl-16">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                    <div className="flex pt-8 items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
