import * as React from "react"

const ContestPreview: React.FC<{ 
    contest: object; 
    onClick: any;
}> = ( { contest, onClick } ) => {

    

    const handleClick = (event) => {
        event.preventDefault();

        onClick(contest.id);
    }
    return (
        <div className="contests-preview link" onClick={handleClick}>
            <div className="category">
                {contest.categoryName}
            </div>
            <div className="contests">
                {contest.contestName}
            </div>
        </div>
    )
}

export default ContestPreview