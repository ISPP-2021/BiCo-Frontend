export interface User {
	index?: number
	name?: string;
	username?: string;
	email?: string;
	password?: string;
	authorities?: {
    	authority: string;
  	}
	token: string;
}
