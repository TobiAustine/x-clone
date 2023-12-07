/* eslint-disable react/prop-types */


const SidebarMenuItem = ({text, active, icon}) => {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      
    
       {icon}
      <span className={`${active && "font-bold"} hidden xl:inline`}> {text}</span> 
      
    </div>
  )
}

export default SidebarMenuItem