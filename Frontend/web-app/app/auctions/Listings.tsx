'use client'
import AuctionCard from "@/app/auctions/AuctionCard";
import {Auction} from '../../types/Index';
import AppPagination from "@/app/components/AppPagination";
import {useEffect, useState} from "react";
import {getData} from "@/app/actions/auctionAction";

export default function(){
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        getData(pageNumber).then(data => {
            setAuctions(data.results);
            setPageCount(data.pageCount);
        })
    }, [pageNumber]);

    if(auctions.length == 0){
        return <h3>Loading...</h3>
    }
    return(
        <>
            <div className='grid grid-cols-4 gap-6'>
                {auctions.map(auction => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination pageChanged={setPageNumber} currentPage={1} pageCount={pageCount} />
            </div>
        </>
    )
}