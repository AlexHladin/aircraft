import { useCallback, useEffect, useState } from "react";
import apiClient from "../http/api-client";
import { useNavigate, useParams } from "react-router-dom";

export interface MaintenanceCompanyList {
    status: boolean;
    data: MaintenanceCompany[];
}

export interface CreateMaintenanceCompanyResponse {
    success: boolean;
    data: MaintenanceCompany;
}

export interface MaintenanceCompany {
    id: number;
    name: string;
    contact: string;
    specialization: string;
}

export const useMaintenanceCompanies = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [maintenanceCompanies, setMaintenanceCompanies] = useState<MaintenanceCompany[]>([]);
    const [selectedMaintenanceCompany, setSelectedMaintenanceCompany] = useState<MaintenanceCompany | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id || isNaN(parseInt(params.id, 10))) {
            return setSelectedMaintenanceCompany(null);
        }
        const id = parseInt(params?.id, 10);
        const selectedAircraft = maintenanceCompanies.find((company) => company.id === id);

        if (selectedAircraft) {
            return setSelectedMaintenanceCompany(selectedAircraft);
        }

        if (maintenanceCompanies.length) {
            setError(new Error('Maintenance company not found'));
        }
    }, [params, maintenanceCompanies]);

    const createMaintenanceCompany = useCallback(async (company: Omit<MaintenanceCompany, 'id'>) => {
        try {
            setIsLoading(true);
            const response = await apiClient.post<CreateMaintenanceCompanyResponse>('/maintenance-company', company);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setMaintenanceCompanies((prev) => [...prev, response.data.data]);
            setError(null);

            navigate('/maintenance-company');
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const updateMaintenanceCompany = useCallback(async (id: number, maintenanceCompany: Omit<MaintenanceCompany, 'id'>) => {
        try {
            setIsLoading(true);
            const response = await apiClient.put<CreateMaintenanceCompanyResponse>(`/maintenance-company/${id}`, maintenanceCompany);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setMaintenanceCompanies((prevMaintenanceCompanies) => prevMaintenanceCompanies.map((prev) => prev.id === id ? { id, ...maintenanceCompany } : prev));
            setError(null);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const listMaintenanceCompanies = useCallback(async () => {
        try {
            const response = await apiClient.get<MaintenanceCompanyList>('/maintenance-company');
            
            setMaintenanceCompanies(response.data.data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteMaintenanceCompany = useCallback(async (id: number) => {
        try {
            setIsLoading(true);
            await apiClient.delete(`/maintenance-company/${id}`);
            
            setMaintenanceCompanies((prev) => prev.filter((company) => company.id !== id));
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        listMaintenanceCompanies();
    }, [listMaintenanceCompanies])

    return {
        maintenanceCompanies,
        isLoading,
        error,
        selectedMaintenanceCompany,
        createMaintenanceCompany,
        updateMaintenanceCompany,
        listMaintenanceCompanies,
        deleteMaintenanceCompany,
    }
}
