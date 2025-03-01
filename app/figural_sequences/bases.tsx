export interface FigureBase {
    canChangeColor: boolean;
    canRotate: boolean;

    display(color: string, rotation: number): React.ReactNode;
}
export class Arrow implements FigureBase {
    canChangeColor = true;
    canRotate = true;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${rotation})`}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0" > </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier" >
                <path d="M8 6L8 2L10 2L16 8L10 14L8 14L8 10L-1.74845e-07 10L-3.01991e-07 6L8 6Z" fill={color}></path>
            </g>
        </svg>
    }
};
export class Cogwheel implements FigureBase {
    canChangeColor = true;
    canRotate = false;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 0 8.4666669 8.4666669" id="svg8" version="1.1" xmlns="http://www.w3.org/2000/svg" fill={color}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <defs id="defs2"></defs>
                <g id="layer1" transform="translate(0,-288.53332)">
                    <path d="m 14,1 c -0.43057,-2.2524e-4 -0.812955,0.2751544 -0.949219,0.6835938 l -1.015625,3.046875 c -0.410051,0.1443778 -0.81115,0.3099019 -1.203125,0.4980468 
                    L 7.9589844,3.7929688 c -0.385025,-0.192405 -0.8499682,-0.1168812 -1.1542969,0.1875 l -2.828125,2.828125 c -0.3043812,0.3043287 -0.379905,0.7692719 
                    -0.1875,1.1542968 l 1.4335937,2.8671874 c -0.1885794,0.39394 -0.3554568,0.796828 -0.5,1.208984 l -3.0429687,1.015626 c -0.4084391,0.136264 -0.68381856,0.518648 
                    -0.68359375,0.949218 v 4 c -2.2524e-4,0.43057 0.27515435,0.812955 0.68359375,0.949219 l 3.0527344,1.017578 c 0.1438828,0.407584 0.3090971,0.805606 0.4960937,1.195313 l 
                    -1.4394531,2.878906 c -0.1924051,0.385025 -0.1168813,0.849968 0.1875,1.154297 l 2.828125,2.830078 c 0.3043287,0.304381 0.7692719,0.379905 1.1542969,0.1875 l 2.8730466,
                    -1.4375 c 0.391573,0.187086 0.791637,0.352283 1.201172,0.496094 l 1.017578,3.050781 C 13.187045,30.734612 13.56943,31.009991 14,31.009766 h 4 c 0.43057,2.25e-4 
                    0.812955,-0.275154 0.949219,-0.683594 l 1.017578,-3.056641 c 0.406496,-0.143244 0.804637,-0.308036 1.193359,-0.49414 l 2.88086,1.441406 c 0.385025,0.192405 0.849967,
                    0.116881 1.154296,-0.1875 l 2.828126,-2.830078 c 0.304381,-0.304329 0.379905,-0.769272 0.1875,-1.154297 l -1.435547,-2.871094 c 0.188179,-0.392579 0.353616,-0.794395 
                    0.498047,-1.205078 l 3.046874,-1.015625 c 0.40844,-0.136264 0.683819,-0.518649 0.683594,-0.949219 v -4 c 2.25e-4,-0.43057 -0.275155,-0.812954 -0.683594,-0.949218 L 
                    27.271484,12.039062 C 27.127133,11.629665 26.96127,11.229223 26.773438,10.837891 l 1.4375,-2.8750004 c 0.192405,-0.3850249 0.116881,-0.8499681 -0.1875,-1.1542968 L 
                    25.195312,3.9804688 C 24.890983,3.676088 24.426041,3.6005642 24.041016,3.7929688 l -2.865235,1.4316406 c -0.395249,-0.1889764 -0.799375,-0.3552819 -1.21289,-0.5 L 
                    18.949219,1.6835938 C 18.812955,1.2751544 18.43057,0.99977476 18,1 Z m 1.996094,7.9980469 c 3.854148,0 7.005859,3.1516861 7.005859,7.0058591 0,3.854136 
                    -3.151711,6.998047 -7.005859,6.998047 -3.854149,0 -6.9980471,-3.143911 -6.9980471,-6.998047 0,-3.854173 3.1438981,-7.0058591 6.9980471,-7.0058591 z"
                        id="path940"
                        transform="matrix(0.26458333,0,0,0.26458333,0,288.53332)"></path>
                </g>
            </g></svg>
    }
}
export class Rectangle implements FigureBase {
    canChangeColor = true;
    canRotate = false;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <title>1230</title> <defs> </defs> <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M0.00199999998,1 C0.00199999998,0.447 0.446,0 0.995,0 L14.967,0 C15.516,0 15.96,0.447 15.96,1 L15.96,15 C15.96,15.553 15.516,16 14.967,16 L0.995,16 C0.446,16 0.00199999998,15.553 0.00199999998,15 L0.00199999998,1 L0.00199999998,1 Z"
                    fill={color}> </path> </g> </g></svg>
    }
};
export class Corner implements FigureBase {
    canChangeColor = true;
    canRotate = true;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform={`rotate(${rotation})`}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path fill={color} d="M16 16l-16-16v16z"></path> </g>
        </svg>
    }
};
export class Crown implements FigureBase {
    canChangeColor = true;
    canRotate = true;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${rotation})`}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z"
                    fill={color}></path>
            </g>
        </svg>
    }
};
export class Balloon implements FigureBase {
    canChangeColor = true;
    canRotate = true;

    display(color: string, rotation: number): React.ReactNode {
        return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${rotation})`}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.4998 9.56052C19.5332 13.7025 16.0815 17.5334 11.9395 17.5C7.79748 17.4666 4.53367 13.5815 4.50025 9.43948C4.46683 5.29748 7.79748 1.96683 11.9395 2.00025C16.0815 2.03367 19.4663 5.41852 19.4998 9.56052ZM12.5061 5.25002C12.0919 5.24668 11.7534 5.57975 11.75 5.99395C11.7467 6.40815 12.0797 6.74663 12.4939 6.74998C13.7281 6.75993 14.7401 7.77194 14.75 9.00605C14.7534 9.42025 15.0919 9.75332 15.5061 9.74998C15.9203 9.74663 16.2533 9.40815 16.25 8.99395C16.2334 6.94088 14.5591 5.26659 12.5061 5.25002Z"
                    fill={color}></path> <path d="M14.167 18.2144C14.4992 19.2767 13.8108 20.3461 12.7501 20.5616V21.9998C12.7501 22.414 12.4143 22.7498 12.0001 22.7498C11.5859 22.7498 11.2501 22.414 11.2501 21.9998V20.5616C10.1894 20.3461 9.50094 19.2767 9.83316 18.2144L9.84005 18.193C10.5044 18.3867 11.2043 18.4939 11.9315 18.4998C12.7025 18.506 13.4493 18.3973 14.1595 18.1909C14.1622 18.1988 14.1646 18.2066 14.167 18.2144Z"
                        fill={color}></path>
            </g>
        </svg>
    }
}

