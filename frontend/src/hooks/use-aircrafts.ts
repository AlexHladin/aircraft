import { useCallback, useEffect, useState } from "react";
import apiClient from "../http/api-client";
import { useNavigate, useParams } from "react-router-dom";

export interface AircraftList {
    status: boolean;
    data: Aircraft[];
}

export interface CreateAircraftResponse {
    success: boolean;
    data: Aircraft;
}

export interface Aircraft {
    id: number;
    model: string;
    serial_number: string;
    registration: string;
}

export const useAircrafts = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
    const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id || isNaN(parseInt(params.id, 10))) {
            return setSelectedAircraft(null);
        }
        const id = parseInt(params?.id, 10);
        const selectedAircraft = aircrafts.find((aircraft) => aircraft.id === id);

        if (selectedAircraft) {
            return setSelectedAircraft(selectedAircraft);
        }

        if (aircrafts.length) {
            setError(new Error('Aircraft not found'));
        }
    }, [params, aircrafts]);

    const createAircraft = useCallback(async (aircraft: Omit<Aircraft, 'id'>) => {
        try {
            setIsLoading(true);
            const response = await apiClient.post<CreateAircraftResponse>('/aircraft', aircraft);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setAircrafts((prevAircrafts) => [...prevAircrafts, response.data.data]);
            setError(null);

            navigate('/aircraft');
        } catch (error) {
            console.log('catch', error);
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const updateAircraft = useCallback(async (id: number, aircraft: Omit<Aircraft, 'id'>) => {
        try {
            setIsLoading(true);
            const response = await apiClient.put<CreateAircraftResponse>(`/aircraft/${id}`, aircraft);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setAircrafts((prevAircrafts) => prevAircrafts.map((prevAircraft) => prevAircraft.id === id ? { id, ...aircraft } : prevAircraft));
            setError(null);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const listAircrafts = useCallback(async () => {
        try {
            const response = await apiClient.get<AircraftList>('/aircraft');
            
            console.log('aircrafts', response.data.data);

            setAircrafts(response.data.data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteAircraft = useCallback(async (id: number) => {
        try {
            setIsLoading(true);
            await apiClient.delete(`/aircraft/${id}`);
            
            setAircrafts((prevAircrafts) => prevAircrafts.filter((aircraft) => aircraft.id !== id));
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        listAircrafts();
    }, [listAircrafts])

    return {
        aircrafts,
        isLoading,
        error,
        selectedAircraft,
        createAircraft,
        updateAircraft,
        listAircrafts,
        deleteAircraft,
    }
}
