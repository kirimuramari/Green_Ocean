

import { ColorFormView } from "@/components/common/ColorFormView";
import { Color, Colorform} from "@/types/types";
import { EditButtonRow } from "./EditButtonRow";

type Props = {
    selectedColor: Color;
    form:Colorform;
    handleChange:<K extends keyof Colorform>(
        key:K,
        value:Colorform[K]
    ) => void;

    setList:string[];

    handleUpdate:() => void;
    handleCancelEdit:() => void;

    updating:boolean;

};

export function EditFormSection({

    selectedColor,
    form,
    handleChange,
    setList,
    handleUpdate,
    handleCancelEdit,
    updating,

}:Props) {
    return(
              <>
                <ColorFormView
                  form={form}
                  onChange={handleChange}
                  setList={setList}
                  mode="edit"
                  readonlyNumber={selectedColor.番号}
                  onSubmitEditing={handleUpdate}
                />

                <EditButtonRow
                updating={updating}
                onUpdate={handleUpdate}
                onCancel={handleCancelEdit}
                />
                </>
                 );
                }
                
                          
