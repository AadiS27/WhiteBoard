export const Toolbar = () => {
return(
    <div className="absolute right-[50%] bottom-2 translate-x-[50%]  rounded-md p-3 h-12 flex items-center ">
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md">
            <div>Pencil</div>
             <div>Square</div>
              <div>Circle</div>
               <div>Ellipse</div>
        </div>
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md ml-2">
        <div>Undo</div>
         <div>Redo</div>
        </div>
    </div>
)

}