import { Priority, ServiceRequest, Status, UpdateServiceRequest } from "../../hooks/use-service-request";
import { capitalize } from "../../utils";
import { Aircraft } from "../../hooks/use-aircrafts";
import { MaintenanceCompany } from "../../hooks/use-maintenance-company";

interface ServiceRequestFormProps {
    handleSubmit: (serviceRequest: UpdateServiceRequest) => void;
    serviceRequestToEdit?: ServiceRequest;
    aircrafts: Pick<Aircraft, 'id' | 'model'>[];
    maintenanceCompanies: Pick<MaintenanceCompany, 'id' | 'name'>[];
    submitButtonText: string;
    formData: UpdateServiceRequest;
    setFormData: React.Dispatch<React.SetStateAction<UpdateServiceRequest>>;
}

const ServiceRequestForm = ({ handleSubmit, submitButtonText, formData, setFormData, aircrafts, maintenanceCompanies }: ServiceRequestFormProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(formData);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='p-6.5'>
                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Aircraft <span className='text-meta-1'>*</span>
                    </label>
                    <select
                        value={formData.aircraft_id}
                        onChange={handleChange}
                        name="aircraft_id"    
                    >
                        {aircrafts.map((aircraft, index) => (<option value={aircraft.id} key={index}>{aircraft.model}</option>))}
                    </select>
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Aircraft <span className='text-meta-1'>*</span>
                    </label>
                    <select
                        value={formData.maintenance_company_id}
                        onChange={handleChange}
                        name="maintenance_company_id"    
                    >
                        {maintenanceCompanies.map((maintenanceCompany, index) => (<option value={maintenanceCompany.id} key={index}>{maintenanceCompany.name}</option>))}
                    </select>
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Priority <span className='text-meta-1'>*</span>
                    </label>
                    <select
                        value={formData.priority}
                        onChange={handleChange}
                        name="priority"    
                    >
                        {Object.values(Priority).map((key, index) => (<option value={key} key={index}>{capitalize(key)}</option>))}
                    </select>
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Status <span className='text-meta-1'>*</span>
                    </label>
                    <select 
                        value={formData.status}
                        onChange={handleChange}
                        name="status"     
                    >
                        {Object.values(Status).map((key, index) => (<option value={key} key={index}>{capitalize(key)}</option>))}
                    </select>
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Start date
                    </label>
                    <input
                        type="date"
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                        placeholder="Enter contact"
                        name="start_date" 
                        value={formData.start_date} 
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-4.5'>
                    <label className='mb-2.5 block text-black'>
                        Due date
                    </label>
                    <input
                        type="date"
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                        placeholder="Enter contact"
                        name="due_date" 
                        value={formData.due_date} 
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-6'>
                  <label className='mb-2.5 block text-black'>Request details</label>
                  <textarea
                    rows={6}
                    placeholder='Describe your request'
                    name='description'
                    onChange={handleChange}
                    value={formData.description}
                    className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
                  ></textarea>
                </div>

                <button 
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
                >{submitButtonText}</button>
            </div>
        </form>
    );
}

export default ServiceRequestForm;