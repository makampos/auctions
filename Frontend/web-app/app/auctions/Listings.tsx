import AuctionCard from "@/app/auctions/AuctionCard";

async function getData(){
    const res = await fetch('http://localhost:6001/search?pageSize=10')

    if(!res.ok) throw Error('Failed to fetch data')

    return res.json();
}

export default async function(){
    const data = await getData();

    return(
        <div className='grid grid-cols-4 gap-6'>
            {data && data.results.map((auction: any) => (
                <AuctionCard auction={auction} key={auction.id}/>
            ))}
        </div>
    )
}