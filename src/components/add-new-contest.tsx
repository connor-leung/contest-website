import { useState } from 'react'
import { addContest } from '../api-client'

const AddNewContest = ({onSuccess}) => {

    const [showForm, setShowForm] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        const newContestData = {
            contestName: form.contestName.value,
            categoryName: form.contestCategory.value,
            description: form.contestDescription.value,
        }

        const newContest = await addContest(newContestData)
        if (newContest?.id) {
            form.reset()
            onSuccess(newContest)
        }
        
    }


    return(
        <div className="add-new-contest">
            {!showForm && (
                <div className="link" onClick={() => {setShowForm(true)}}>
                    Add New Contest 
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="contestName" placeholder="Contest Name" />
                    <input type="text" name="contestCategory" placeholder="Contest Category" />
                    <textarea name="contestDescription" placeholder="Contest Description" rows={5} />
                    <button type="submit">Submit</button>
                </form>
            )}
                
                

        </div>
    )

}

export default AddNewContest;