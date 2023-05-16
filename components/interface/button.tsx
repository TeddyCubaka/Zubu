import { ReactElement } from "react";
import { PropretyStore } from "../../store/proprety";

export interface UploadToCloudButtonProps {
	proprety: PropretyStore;
	_setDispalyUploadImages: (state: boolean) => void;
}
export interface ButtonProps {
	widthHalf?: boolean;
	type?: string;
	subject: string | ReactElement;
	conditionToPass: boolean;
	fullRounded?: boolean;
	doOnClick: () => any;
	doIfConditionDoesNotPass?: () => void;
	notWidthMax?: boolean;
}
