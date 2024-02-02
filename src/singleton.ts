export class CustomService {
    static instance  : CustomService | null = null;
    private constructor(){}

    static create() : CustomService {
        if(CustomService.instance === null)
            CustomService.instance = new CustomService();

        return CustomService.instance;
    }

}