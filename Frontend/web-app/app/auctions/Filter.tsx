import {Button, ButtonGroup} from "flowbite-react";

type Props = {
    pageSize: number
    setPageSize: (size: number) => void;
}
const pageSizeButtons = [2, 4, 8];

function Filter({pageSize, setPageSize}: Props) {
    return (
        <div className='flex justify-items-start items-center mb-4'>
            <span className='uppercase text-sm text-gray-500 mr-2'>PageS size</span>
            <ButtonGroup>
                {pageSizeButtons.map((value, i) => (
                    <Button key={i}
                    onClick={() => setPageSize(value)}
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

export default Filter;