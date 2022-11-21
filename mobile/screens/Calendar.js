import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from '../theme/styles';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { getTask } from '../store/admin/tasks/taskActions';

export default function Calendar(props) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { theme } = useSelector((state) => state.commonReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  
  let [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  let [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  let [selectedDate, setSelectedDate] = useState(new Date());
  let [daysList, setDaysList] = useState([]);
  let [weekDays, setWeekDays] = useState(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

  const dispatch = useDispatch();
  const styles = getStyles(theme);

  useEffect(() => {
    getDaysList();
    dispatch(getTask());
  }, []);

  useEffect(() => {
    getDaysList();
    setSelectedDate(new Date(selectedYear, months.indexOf(selectedMonth), 1));
  }, [selectedMonth, selectedYear]);

  const getDaysList = () => {
    let days = {'Su': [], 'Mo': [], 'Tu': [], 'We': [], 'Th': [], 'Fr': [], 'Sa': []};
    let day = 1;
    let firstDay = new Date(selectedYear, months.indexOf(selectedMonth), 1).getDay();
    for(let i = 0; i < firstDay; i++) {
      days[weekDays[i]].push(null);
    }
    let date = moment(`${day} ${selectedMonth}, ${selectedYear}`, 'D MMMM, YYYY');
    for (let i = 1; i <= date.daysInMonth(); i++) {
      let d = moment(`${i} ${selectedMonth}, ${selectedYear}`, 'D MMMM, YYYY');
      days[d.format('dd')].push({
        date: d,
        tasks: tasks.filter((task) => {
          return moment(task.endDate).format('DD MMMM, YYYY') === d.format('DD MMMM, YYYY');
        })
      });
    }
    setDaysList(days);
  }

  const onArrowPress = (direction) => {
    if (direction === 'left') {
      if (selectedMonth === 'January') {
        setSelectedMonth('December');
      } else {
        setSelectedMonth(months[months.indexOf(selectedMonth) - 1]);
      }
    } else {
      if (selectedMonth === 'December') {
        setSelectedMonth('January');
      } else {
        setSelectedMonth(months[months.indexOf(selectedMonth) + 1]);
      }
    }
  }

  // Header buttons
  function getHeaderButtons(){
    return <View style={styles.headerWrapper}>
      <TouchableOpacity style={styles.headerButton} onPress={() => onArrowPress('left')}>
        <Feather name="chevron-left" size={20} style={{color: theme.grey}} color={theme.dark} />
      </TouchableOpacity>
      <Text style={styles.calendarText}>{selectedMonth}, {selectedYear}</Text>
      <TouchableOpacity style={styles.headerButton} onPress={() => onArrowPress('right')}>
        <Feather name="chevron-right" size={20} style={{color: theme.grey}} color={theme.dark} />
      </TouchableOpacity>
    </View>
  }

  function calendarHeader() {
    return <View style={styles.itemList}>
        <View style={styles.itemRow}>
          {
            weekDays.map((item, index) => {
              return <View key={index} style={styles.item}>
                <Text style={{...styles.itemText, fontWeight: commonStyles.fontSemiBold}}>{item}</Text>
              </View>
            })
          }
        </View>
      </View>
  }

  function calendarGrid(){
    return <View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>{ getWeekDaysItems(0) }</View>
        <View>{ getWeekDaysItems(1) }</View>
        <View>{ getWeekDaysItems(2) }</View>
        <View>{ getWeekDaysItems(3) }</View>
        <View>{ getWeekDaysItems(4) }</View>
        <View>{ getWeekDaysItems(5) }</View>
        <View>{ getWeekDaysItems(6) }</View>
      </View>
    </View>
  }

  const getWeekDaysItems = (i) => {
    return daysList[weekDays[i]]?.map((item, index) => {
      return <View style={{...styles.calendarDaySlots}}>
        <TouchableOpacity style={item?.tasks.length > 0 ? {...styles.calendarDayItem, ...styles.calendarDayItemHasTasks} : {...styles.calendarDayItem, ...styles.item}}>
          {item && item.tasks.length > 0 && <Text style={styles.calendarItemBadge}>{item?.tasks.length}</Text>}
          {!item && <Text style={styles.calendarDayItemText}></Text>}
          {item && item.date && <Text style={styles.calendarDayItemText}>{moment(item.date).date()}</Text>}
        </TouchableOpacity>
      </View>
    })
  }

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <SafeAreaView>
        <StatusBar barStyle={theme.barStyle}/>
        <View style={{...commonStyles.mainContainer, backgroundColor: theme.background}}>
            <Text style={{...commonStyles.mainHeading, color: theme.dark}}>Calendar</Text>
            {getHeaderButtons()}
            {calendarHeader()}
            {calendarGrid()}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 20,
            }}>
              <View style={{
                width: 30,
                height: 30,
                backgroundColor: theme.secondary,
                borderRadius: 5,
              }}></View>
              <Text style={{
                marginLeft: 10,
                color: theme.dark,
                fontSize: 16,
              }}>Tasks End Date</Text>
            </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const getStyles = (theme) => {
  return StyleSheet.create({
    calendarDayItem: {
      backgroundColor: theme.light,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width: 40,
      height: 40,
      position: 'relative'
    },
    calendarItemBadge: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 1,
      top: -5,
      right: -5,
      backgroundColor: theme.secondary,
      color: 'fff',
      fontSize: 10,
      textAlign: 'center',
      width: 20,
      height: 20,
      fontWeight: 'bold',
      borderColor: theme.background,
      borderWidth: 2,
      zIndex: 99,
      borderRadius: 10,
      overflow: 'hidden'
    },
    calendarDayItemHasTasks: {
      backgroundColor: theme.secondary,
    },
    calendarDayItemText: {
      color: theme.dark,
      fontWeight: '500',
    },
    itemRow: {
      marginTop: 10,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemText: {
      color: theme.darkGrey,
      fontSize: 13,
      fontWeight: commonStyles.fontSemiBold,
    },  
    item: {
      padding: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    headerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },  
    headerButton: {
      padding: 10,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.light,
    },
    calendarText: {
      color: theme.dark,
      fontSize: 16,
      fontWeight: commonStyles.fontSemiBold,
    },
    container: {
      backgroundColor: theme.background,
      height: "100%",
      padding: 20,
      paddingTop: 40,
    },
    itemList: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: 10,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      color: "black",
      fontWeight: "bold",
    },
    linkWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
      paddingBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    link: {
      color: theme.dark,
      fontSize: 16,
      fontFamily: commonStyles.fontMedium,
    },
  });
}