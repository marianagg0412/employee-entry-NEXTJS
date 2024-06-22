export enum AbsenceType {
    CITA_MEDICA = 'Cita médica',
    CALAMIDAD = 'Calamidad',
    DILIGENCIA_PERSONAL = 'Diligencia personal',
}

export enum Areas {
    IT = 'Sistemas',
    PROD = 'Producción',
    MARK = 'Mercadeo',
}

export enum GuestTypes{
    VISITANTE = 'Visitante',
    PROVEEDOR = 'Proveedor',
}

export interface Entry {
    employee_name: string;
    employee_id: string;
    employee_area: Areas;
    entry_time: string;
    exit_time: string | null;
    total_time: string | null;
    motivo_retiro: AbsenceType | null;
}


export interface GuestEntry {
    guest_name: string;
    guest_id: string;
    entry_time: string;
    exit_time: string;
    guest_type: string;
}



