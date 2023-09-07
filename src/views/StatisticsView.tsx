import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { UserStatistics } from "@src/models/User";
import { numericCarry, timeTransfer } from "@src/utils/forumUtils";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface StatisticsViewProps {
  userStatistics: UserStatistics;
}

const StatisticsCard = (options: {
  icon: JSX.Element;
  title: string;
  data: string;
}) => {
  return (
    <View style={StatisticsCardStyle.whole}>
      {options.icon}
      <View style={StatisticsCardStyle.contentWrapper}>
        <Text style={StatisticsCardStyle.title}>{options.title}</Text>
        <Text style={StatisticsCardStyle.data}>{options.data}</Text>
      </View>
    </View>
  );
};

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  userStatistics,
}: StatisticsViewProps) => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Statistics">["navigation"]>();

  type StaticsStruct = {
    icon: JSX.Element;
    title: string;
    data: string;
  };

  const getRenderItemList = (dataList: StaticsStruct[]) => {
    const result: JSX.Element[] = [];
    for (const item of dataList) {
      result.push(
        <StatisticsCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          data={item.data}
        />
      );
    }
    return result;
  };

  const getRenderData = (statisticsInfo: UserStatistics): StaticsStruct[] => {
    const result: StaticsStruct[] = [];
    for (const key in statisticsInfo) {
      switch (key) {
        case "upvotesGranted": {
          const obj: StaticsStruct = {
            icon: (
              <Icon type="antdesign" name="like2" color={"#EEAD0E"} size={36} />
            ),
            title: "获赞数",
            data: numericCarry(statisticsInfo[key]).toString(),
          };
          result.push(obj);
          break;
        }
        case "upvotesRecieved": {
          const obj: StaticsStruct = {
            icon: (
              <Icon
                type="antdesign"
                name="dislike2"
                color={"#EEAD0E"}
                size={36}
              />
            ),
            title: "获踩数",
            data: numericCarry(statisticsInfo[key]).toString(),
          };
          result.push(obj);
          break;
        }
        case "postsCreated": {
          const obj: StaticsStruct = {
            icon: (
              <Icon
                type="antdesign"
                name="filetext1"
                color={"#EEAD0E"}
                size={36}
              />
            ),
            title: "创建帖子数",
            data: numericCarry(statisticsInfo[key]).toString(),
          };
          result.push(obj);
          break;
        }
        case "topicsCreated": {
          const obj: StaticsStruct = {
            icon: (
              <Icon
                type="antdesign"
                name="solution1"
                color={"#EEAD0E"}
                size={36}
              />
            ),
            title: "创建话题数",
            data: numericCarry(statisticsInfo[key]).toString(),
          };
          result.push(obj);
          break;
        }
        case "registerDate": {
          const obj: StaticsStruct = {
            icon: (
              <Icon
                type="antdesign"
                name="adduser"
                color={"#EEAD0E"}
                size={36}
              />
            ),
            title: "注册日期",
            data: timeTransfer(statisticsInfo[key]),
          };
          result.push(obj);
          break;
        }
      }
    }
    return result;
  };

  return (
    <View style={StatisticsViewStyle.whole}>
      <View style={StatisticsViewStyle.header}>
        <HeaderBarWrapper alignMethod="lc">
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <Icon type="antdesign" name="left" size={24} />
          </TouchableOpacity>
          <Text style={StatisticsViewStyle.title}>数据统计</Text>
        </HeaderBarWrapper>
      </View>
      <View style={StatisticsViewStyle.content}>
        <ScrollView>
          <View style={StatisticsViewStyle.cardList}>
            {getRenderItemList(getRenderData(userStatistics))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const StatisticsViewStyle = StyleSheet.create({
  whole: {
    flex: 1,
  },
  cardList: {
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    flex: 2,
    backgroundColor: "rgb(230,230,230)",
  },
  content: {
    backgroundColor: "rgb(250,250,250)",
    flex: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const StatisticsCardStyle = StyleSheet.create({
  whole: {
    backgroundColor: "#FFFFF0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 80,
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#696969",
  },
  data: {
    fontSize: 16,
    color: "#696969",
  },
  contentWrapper: {
    alignItems: "center",
    marginLeft: 10,
  },
});
