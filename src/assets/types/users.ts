export type FullUser = {
    id: number;
    id_system: number;
    id_system_subscription: number;
    id_entity: number;
    id_system_subscription_user: number;
    username: string;
    password: string;
    names_obj: string | {
        id_entity_name_type: number;
        type: string;
        names: string[]
    }[];
    name: string;
    complete_name: string;
    names: string | null;
    surnames: string | null;
    documents: string | null;
    phones: string | null;
    emails: string | null;
    is_admin: number | boolean;
    annulled_at_system: Date | null;
    annulled_at_system_subscription: Date | null;
    annulled_at_system_subscription_user: Date | null;
    annulled_by_system_subscription: Date | null;
    annulled_by_system_subscription_user: Date | null;
    annulled_at: Date | null;
    annulled_by: number | null;
};