export type FullUser = {
    id: number;
    system_id: string;
    system_subscription_id: string;
    entity_id: string;
    system_subscription_user_id: string;
    username: string;
    password: string;
    names_obj: string | {
        entity_name_type_id: string;
        type: string;
        names: string[]
    }[];
    name: string;
    complete_name: string;
    names: string | null;
    surnames: string | null;
    documents: string | null | {[key: string | symbol]: any};
    phones: string | null;
    emails: string | null;
    is_admin: number | boolean;
    inactivated_at_system: Date | null;
    inactivated_at_system_subscription: Date | null;
    inactivated_at_system_subscription_user: Date | null;
    inactivated_by_system_subscription: Date | null;
    inactivated_by_system_subscription_user: Date | null;
    inactivated_at: Date | null;
    inactivated_by: number | null;
    annulled_at_system: Date | null;
    annulled_at_system_subscription: Date | null;
    annulled_at_system_subscription_user: Date | null;
    annulled_by_system_subscription: Date | null;
    annulled_by_system_subscription_user: Date | null;
    annulled_at: Date | null;
    annulled_by: number | null;
};

export type CompleteEntityUser = {
    id: number;
    system_id: string;
    system_subscription_id: string;
    entity_id: string;
    system_subscription_user_id: string;
    username: string;
    password: string;
    name: string;
    names_obj: string | {
        type: string,
        names: string[],
        entity_name_type_id: string
    }[];
    complete_name: string;
    names: string | null;
    surnames: string | null;
    documents: null | {
        id: number,
        order: number,
        symbol: string,
        city_id: null | number,
        category: string,
        document: string,
        state_id: null | number,
        entity_id: string,
        country_id: null | number,
        entity_document_id: string,
        entity_document_category_id: string
    };
    phones: null | string[];
    emails: null | string[];
    is_admin: number | boolean;
    inactivated_at_system: Date | null;
    inactivated_at_system_subscription: Date | null;
    inactivated_at_system_subscription_user: Date | null;
    inactivated_by_system_subscription: Date | null;
    inactivated_by_system_subscription_user: Date | null;
    inactivated_at: Date | null;
    inactivated_by: number | null;
    annulled_at_system: Date | null;
    annulled_at_system_subscription: Date | null;
    annulled_at_system_subscription_user: Date | null;
    annulled_by_system_subscription: Date | null;
    annulled_by_system_subscription_user: Date | null;
    annulled_at: Date | null;
    annulled_by: number | null;
    entity_parent_id: string;
    document_id: string;
    is_natural: 1 | 0;
    gender: null | 'Male' | 'Female';
    date_birth: null | string | Date;
    address: null | string;
    photo: null | string;
    created_at: number;
    created_by: number;
    updated_at: number;
    updated_by: number;
    legal_name: null | string;
    business_name: null | string;
    comercial_designation: null | string;
}