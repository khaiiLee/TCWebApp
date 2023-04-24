import { SvgIcon, SvgIconProps } from "@mui/material";

const UserPlusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 17 16" {...props}>
      <path
        d="M16.3359 3.60254H15.7383V3.00488C15.7383 2.63812 15.441 2.34082 15.0742 2.34082C14.7075 2.34082 14.4102 2.63812 14.4102 3.00488V3.60254H13.8125C13.4457 3.60254 13.1484 3.89984 13.1484 4.2666C13.1484 4.63336 13.4457 4.93066 13.8125 4.93066H14.4102V5.52832C14.4102 5.89508 14.7075 6.19238 15.0742 6.19238C15.441 6.19238 15.7383 5.89508 15.7383 5.52832V4.93066H16.3359C16.7027 4.93066 17 4.63336 17 4.2666C17 3.89984 16.7027 3.60254 16.3359 3.60254Z"
        fill="currentColor"
      />
      <path
        d="M10.4726 7.64439C11.4834 6.86345 12.1357 5.63988 12.1357 4.2666C12.1357 1.91399 10.2217 0 7.86914 0C5.51653 0 3.60254 1.91399 3.60254 4.2666C3.60254 5.63985 4.25485 6.86345 5.26572 7.64439C2.26754 8.69235 0 11.5689 0 15.0742C0 15.441 0.297301 15.7383 0.664062 15.7383H15.0742C15.441 15.7383 15.7383 15.441 15.7383 15.0742C15.7383 11.568 13.469 8.69175 10.4726 7.64439ZM4.93066 4.2666C4.93066 2.64632 6.24886 1.32812 7.86914 1.32812C9.48942 1.32812 10.8076 2.64632 10.8076 4.2666C10.8076 5.88688 9.48942 7.20508 7.86914 7.20508C6.24886 7.20508 4.93066 5.88688 4.93066 4.2666ZM1.36159 14.4102C1.69538 11.1141 4.48651 8.5332 7.86914 8.5332C11.2518 8.5332 14.0429 11.1141 14.3767 14.4102H1.36159Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default UserPlusIcon;
