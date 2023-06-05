import { HStack, VStack } from "@react-native-material/core"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPeople } from "Api/Admin/AdminPeople"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import PersonCard from "components/common/PersonCard"
import { ROLES } from "constants/Constants"
import { COLORS } from "palette/colors"
import React, { useEffect, useState } from "react"
import { ScrollView, Text } from "react-native"
import { Avatar, Searchbar } from "react-native-paper"

interface IPerson {
	id: string
	fullName: string
	role: number
	lastEntry: boolean
	firstEntry: boolean
}

const AdminPeople = ({ navigation }: any) => {
	const [search, setSearch] = useState("")
	const pageSize = 8
	const [people, setPeople] = useState<IPerson[]>([])
	const [refreshPeople, setRefreshPeople] = useState(false)
    const [editedPerson, setEditedPerson] = useState<boolean>(false)
	const {
		data: pages,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		["people", refreshPeople, search],
		({ pageParam = 1 }) =>
			fetchPeople({
				name: search,
				pageParam,
				pageSize: pageSize,
			}),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.page != lastPage.totalPages) {
					return lastPage.page + 1
				}
				return false
			},

			enabled: true,
		}
	)
	useEffect(() => {
		if (pages) {
			const newPeople = pages.pages.flatMap((page) => page.data)

			if (people.length > 0) {
				let lastPersonInOldList = people[people.length - 1]
				lastPersonInOldList.lastEntry = false
				let firstPersonInNewList = {
					...newPeople[(pages.pages.length - 1) * pageSize],
				}
				firstPersonInNewList.firstEntry = false

				const updatedPeople = [
					...people.slice(0, people.length - 1),
					lastPersonInOldList,
					firstPersonInNewList,
					...newPeople.slice(people.length + 1),
				]

				setPeople(updatedPeople)
			} else {
				setPeople(newPeople)
			}
		}
	}, [pages])
	useEffect(() => {
		setPeople([])
		setRefreshPeople(!refreshPeople)
	}, [search, editedPerson])

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView
				onScroll={({ nativeEvent }) => {
					if (
						nativeEvent.layoutMeasurement.height +
							nativeEvent.contentOffset.y >=
							nativeEvent.contentSize.height &&
						hasNextPage
					) {
						fetchNextPage()
					}
				}}
				scrollEventThrottle={0}
			>
				<VStack style={{ padding: 30 }} spacing={10}>
					<HStack justify="between">
						<Text
							style={{
								color: COLORS.white,
								fontSize: 20,
								fontWeight: "600",
							}}
						>
							People
						</Text>
						<Avatar.Icon
							size={40}
							icon="account"
							color={COLORS.white}
							style={{
								marginRight: 10,
								backgroundColor: COLORS.blue,
							}}
						/>
					</HStack>
					<Searchbar
						value={search}
						placeholder="Search user..."
						style={{ backgroundColor: COLORS.gray, height: 35 }}
						onChangeText={(text) => setSearch(text)}
						inputMode="search"
						inputStyle={{
							color: COLORS.black,
							textAlignVertical: "top",
							marginTop: 7,
						}}
					/>
					<VStack style={{ marginTop: 20 }} spacing={0}>
						{people.map((person, index) => (
							<PersonCard
								key={person.id + index}
								fullName={person.fullName}
								role={person.role}
								lastEntry={person.lastEntry}
								firstEntry={person.firstEntry}
								id={person.id}
							/>
						))}
					</VStack>
				</VStack>
			</ScrollView>
		</BottomAppbarLayout>
	)
}

export default AdminPeople
