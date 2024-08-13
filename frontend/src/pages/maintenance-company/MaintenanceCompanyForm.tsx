import { MaintenanceCompany } from "../../hooks/use-maintenance-company";

interface MaintenanceCompanyFormProps {
    handleSubmit: () => void;
    maintenanceCompanyToEdit?: MaintenanceCompany;
    submitButtonText: string;
    formData: Omit<MaintenanceCompany, 'id'>;
    setFormData: React.Dispatch<React.SetStateAction<Omit<MaintenanceCompany, 'id'>>>;
}

const MaintenanceCompanyForm = ({ handleSubmit, submitButtonText, formData, setFormData }: MaintenanceCompanyFormProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData: Omit<MaintenanceCompany, 'id'>) => ({ ...prevFormData, [name]: value }));
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
                        Name <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Enter name'
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                    />
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Contact <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter contact"
                        name="contact" 
                        value={formData.contact} 
                        onChange={handleChange}
                        className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                    />
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Specialization <span className='text-meta-1'>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter specialization"
                        name="specialization" 
                        value={formData.specialization} 
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

export default MaintenanceCompanyForm;