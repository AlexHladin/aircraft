import { Aircraft } from "../../hooks/use-aircrafts";

interface AircraftFormProps {
    handleSubmit: () => void;
    aircraftToEdit?: Aircraft;
    submitButtonText: string;
    formData: Omit<Aircraft, 'id'>;
    setFormData: React.Dispatch<React.SetStateAction<Omit<Aircraft, 'id'>>>;
}

const AircraftForm = ({ handleSubmit, submitButtonText, formData, setFormData }: AircraftFormProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData: Omit<Aircraft, 'id'>) => ({ ...prevFormData, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='p-6.5'>
                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Model <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Enter model'
                        name="model" 
                        value={formData.model} 
                        onChange={handleChange}
                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                    />
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Serial number <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Enter serial number'
                        name="serial_number" 
                        value={formData.serial_number} 
                        onChange={handleChange}
                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                    />
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Registration <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Registration"
                        name="registration" 
                        value={formData.registration} 
                        onChange={handleChange}
                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                    />
                </div>

                <button 
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
                >{submitButtonText}</button>
            </div>
        </form>
    );
}

export default AircraftForm;