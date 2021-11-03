export interface ThaliaProfile {
    pk: number,
    profile: {
        display_name: string,
        photo: {
            full: string,
            small: string,
            medium: string,
            large: string
        },

    }
}