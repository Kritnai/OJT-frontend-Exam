
interface selectOption {
    id?: string | number | null;
    label: string;
    value: string;
}

export const patianStatusOption: selectOption[] = [
    {
        id: "patian-option-1",
        label: "หาย",
        value: "หาย",
    },
    {
        id: "patian-option-2",
        label: "รักษาอยู่",
        value: "รักษาอยู่",
    },
    {
        id: "patian-option-3",
        label: "ยกเลิกการรักษา",
        value: "ยกเลิกการรักษา",
    },
]

export const genderOptions: selectOption[] = [
    {
        id: "gener-option-1",
        label: "ชาย",
        value: "ชาย",
    },
    {
        id: "gener-option-2",
        label: "หญิง",
        value: "หญิง",
    }
]

export const diseaseOptions: selectOption[] = [
    {
        id: "disease-option-1",
        label: "ความดันสูง",
        value: "ความดันสูง",
    },
    {
        id: "disease-option-2",
        label: "เบาหวาน",
        value: "เบาหวาน",
    },
    {
        id: "disease-option-3",
        label: "หัวใจ",
        value: "หัวใจ",
    },
    {
        id: "disease-option-4",
        label: "ไมเกรน",
        value: "ไมเกรน",
    },
    {
        id: "disease-option-5",
        label: "เกาต์",
        value: "เกาต์",
    },
    {
        id: "disease-option-6",
        label: "ภูมิแพ้",
        value: "ภูมิแพ้",
    },
    {
        id: "disease-option-7",
        label: "หอบหืด",
        value: "หอบหืด",
    },
    {
        id: "disease-option-9",
        label: "ไขมันในเลือดสูง",
        value: "ไขมันในเลือดสูง",
    },
    {
        id: "disease-option-10",
        label: "กระเพาะอาหาร",
        value: "กระเพาะอาหาร",
    },
    {
        id: "disease-option-11",
        label: "ความดันโลหิตสูง",
        value: "ความดันโลหิตสูง",
    },
    {
        id: "disease-option-12",
        label: "ไทรอยด์",
        value: "ไทรอยด์",
    },

]