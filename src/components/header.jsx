import React from "react"
import { TbArrowsCross } from "react-icons/tb";
import { Input } from "@nextui-org/react"
import { CiSearch } from "react-icons/ci";
import { Button } from '@nextui-org/button';
import { Avatar } from "@nextui-org/react";
import { useAuthContext } from "../context/authContext";


const Header = () => {
	const { user } = useAuthContext()
	return <div>
		<div className="flex items-center justify-around border border-spacing-8 border-t-0 border-l-0 border-r-0 border-b-2 p-1 fixed bg-white w-full z-20">
			<div>
				<span className="text-[2rem] flex items-center mr-10">Insta<TbArrowsCross /></span>

			</div>
			<div>
				<Input
					isClearable
					// radius="lg"
					size={"small"}
					classNames={{
						label: "text-black/50 dark:text-white/90",
						input: [
							"bg-transparent",
							"text-black/90 dark:text-white/90",
							"placeholder:text-default-700/50 dark:placeholder:text-white/60",
						],
						innerWrapper: "bg-transparent",
						inputWrapper: [
							// "shadow-xl",
							"bg-default-200/50",
							"dark:bg-default/60",
							"backdrop-blur-xl",
							"backdrop-saturate-200",
							"hover:bg-default-200/70",
							"dark:hover:bg-default/70",
							"group-data-[focused=true]:bg-default-200/50",
							"dark:group-data-[focused=true]:bg-default/60",
							"!cursor-text",
						],
					}}
					className=" flex w-[23rem]"
					placeholder="Type to search..."
					startContent={
						<CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
					}
				/>
			</div>


			<div className="flex items-center gap-2">
				<Button color="secondary">Create</Button>
				<Avatar src={user?.profilePhoto} />
			</div>
		</div>
	</div>
}

export default Header
