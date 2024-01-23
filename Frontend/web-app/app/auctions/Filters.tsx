import {Button, ButtonGroup} from "flowbite-react";
import {useParamsStore} from "@/hooks/UseParamsStore";

const pageSizeButtons = [2, 4, 8];

function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams  = useParamsStore(state => state.setParams);
    return (
        <div className='flex justify-items-start items-center mb-4'>
            <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
            <ButtonGroup>
                {pageSizeButtons.map((value, i) => (
                    <Button key={i}
                    onClick={() => setParams({pageSize: value})}
                    color={`${pageSize == value ? 'red':'gray'}`}
                    className='focus:ring-0'
                    >
                        {value}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Filters;