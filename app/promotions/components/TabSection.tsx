import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabSection() {
    return (

        <Tabs defaultValue="ALL PROMOTIONS" className="max-w-7xl mx-auto mt-40 ">
            <TabsList className='w-full bg-white/0 '>
                <TabsTrigger value="ALL PROMOTIONS" className='data-[state=active]:text-black text-blue-900 data-[state=active]:shadow-none cursor-pointer text-xl font-medium'>
                    <h1>ALL PROMOTIONS</h1>
                </TabsTrigger>
                <TabsTrigger value="REPAIR" className='data-[state=active]:text-black text-blue-900 data-[state=active]:shadow-none cursor-pointer text-xl font-medium'>
                    <h1>REPAIR</h1>
                </TabsTrigger>
                <TabsTrigger value="MAINTAIN" className='data-[state=active]:text-black text-blue-900 data-[state=active]:shadow-none cursor-pointer text-xl font-medium'>
                    <h1>MAINTAIN</h1>
                </TabsTrigger>
                <TabsTrigger value="ACC" className='data-[state=active]:text-black text-blue-900 data-[state=active]:shadow-none cursor-pointer text-xl font-medium'>
                    <h1>ACC</h1>
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ALL PROMOTIONS" className=''>
                <h1 className='text-gray-700 py-6 border-b border-blue-950 w-fit mx-auto text-2xl my-20 text-center'>
                    WE CURRENTLY DO NOT HAVE ANY PROMOTIONS. <br/> PLEASE, VISIT AGAIN AT A LATER TIME.
                </h1>
            </TabsContent>
            <TabsContent value="REPAIR" className=''>
                <h1 className='text-gray-700 py-6 border-b border-blue-950 w-fit mx-au2xl text-xl my-20 text-center'>
                    WE CURRENTLY DO NOT HAVE ANY PROMOTIONS. <br/> PLEASE, VISIT AGAIN AT A LATER TIME.
                </h1>
            </TabsContent>
            <TabsContent value="MAINTAIN" className=''>
                <h1 className='text-gray-700 py-6 border-b border-blue-950 w-fit mx-auto2xlext-xl my-20 text-center'>
                    WE CURRENTLY DO NOT HAVE ANY PROMOTIONS. <br/> PLEASE, VISIT AGAIN AT A LATER TIME.
                </h1>
            </TabsContent>
            <TabsContent value="ACC" className=''>
                <h1 className='text-gray-700 py-6 border-b border-blue-950 w-fit mx2xluto text-xl my-20 text-center'>
                    WE CURRENTLY DO NOT HAVE ANY PROMOTIONS. <br/> PLEASE, VISIT AGAIN AT A LATER TIME.
                </h1>
            </TabsContent>
        </Tabs>

    )
}