import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Alert,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '@/components/common/Card';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Chip, Divider } from 'react-native-paper';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function ChefDashboard() {
  const { colors } = useTheme();
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      client_name: 'David Alonso',
      booking_date: '2023-12-07',
      status: 'confirmed',
      location: 'Upsoshor, Sylhet',
    },
    {
      id: 2,
      client_name: 'Maria Garcia',
      booking_date: '2023-12-10',
      status: 'pending',
      location: 'Downtown, Sylhet',
    },
    {
      id: 3,
      client_name: 'John Smith',
      booking_date: '2023-12-15',
      status: 'confirmed',
      location: 'Zindabazar, Sylhet',
    },
  ]);
  const [popularDishes, setPopularDishes] = useState([
    {
      id: 1,
      name: 'Special rice bowl',
      rating: 4.7,
      price: 3.99,
      image: require('../../../assets/dishes/rice-bowl.jpg'),
    },
    {
      id: 2,
      name: 'Chicken rice bowl',
      rating: 4.4,
      price: 4.99,
      image: require('../../../assets/dishes/chicken-rice.jpg'),
    },
    {
      id: 3,
      name: 'Banana pie cake',
      rating: 4.8,
      price: 2.99,
      image: require('../../../assets/dishes/banana-cake.jpg'),
    },
    {
      id: 4,
      name: 'Special kaochi',
      rating: 4.5,
      price: 5.99,
      image: require('../../../assets/dishes/kaochi.jpg'),
    },
  ]);
  const [earnings, setEarnings] = useState({
    currentMonth: 1250,
    pendingPayout: 450,
    total: 11.97,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // Fetch real data here
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRefreshing(false);
    }
  };

  const handleDirectLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.replace('/login');
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Ionicons name="restaurant" size={24} color="white" />
        </View>
        <View style={styles.sidebarIcons}>
          <TouchableOpacity style={styles.sidebarIconActive}>
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarIcon}>
            <Ionicons name="person" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarIcon}>
            <Ionicons name="heart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarIcon}>
            <Ionicons name="mail" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarIcon}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleDirectLogout}>
          <Ionicons name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by client name / location"
              placeholderTextColor="#999"
            />
          </View>
          <Text style={styles.dateText}>{format(new Date(), 'do MMMM yyyy')}</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.profileName}>{userProfile?.full_name || 'Chef'}</Text>
            <Avatar.Image size={40} source={{ uri: userProfile?.avatar_url }} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchDashboardData} />
          }>
          <View style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Get free delivery</Text>
              <Text style={styles.promoSubtitle}>for all your bookings over $30 this week</Text>
            </View>
            <Image
              source={require('../../../assets/chef-promo.png')}
              style={styles.promoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular dishes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>
                Sort by <Ionicons name="chevron-down" size={16} />
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dishesScroll}>
            {popularDishes.map(dish => (
              <View key={dish.id} style={styles.dishCard}>
                <Image source={dish.image} style={styles.dishImage} />
                <View style={styles.dishRating}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{dish.rating}</Text>
                </View>
                <Text style={styles.dishName}>{dish.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>${dish.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming bookings</Text>
            <TouchableOpacity onPress={() => router.push('/bookings')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {bookings.map(booking => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingInfo}>
                <Text style={styles.clientName}>{booking.client_name}</Text>
                <Text style={styles.bookingDate}>
                  {format(new Date(booking.booking_date), 'PPP')}
                </Text>
                <Text style={styles.bookingLocation}>{booking.location}</Text>
              </View>
              <View style={styles.bookingActions}>
                <Chip
                  style={[
                    styles.statusChip,
                    booking.status === 'confirmed' ? styles.confirmedChip : styles.pendingChip,
                  ]}>
                  {booking.status}
                </Chip>
                <Text style={styles.viewDetails}>View details</Text>
              </View>
            </View>
          ))}

          <View style={styles.earningsCard}>
            <Text style={styles.earningsTitle}>Your earnings summary</Text>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>This Month:</Text>
              <Text style={styles.earningsValue}>${earnings.currentMonth}</Text>
            </View>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Pending Payout:</Text>
              <Text style={styles.earningsValue}>${earnings.pendingPayout}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.earningsRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${earnings.total}</Text>
            </View>
            <Button
              mode="contained"
              style={styles.checkoutButton}
              onPress={() => router.push('/earnings/withdraw')}>
              Withdraw
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f7fa',
  },
  sidebar: {
    width: 60,
    backgroundColor: '#2D2B52',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3D3B62',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarIcons: {
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  sidebarIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3D3B62',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  dateText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: '#666',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  promoCard: {
    backgroundColor: '#E8EEFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  promoImage: {
    width: 100,
    height: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#666',
    fontSize: 14,
  },
  dishesScroll: {
    marginBottom: 20,
  },
  dishCard: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  dishImage: {
    width: 150,
    height: 100,
  },
  dishRating: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  dishName: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D2B52',
  },
  addButton: {
    backgroundColor: '#2D2B52',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingLocation: {
    fontSize: 14,
    color: '#666',
  },
  bookingActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusChip: {
    marginBottom: 10,
  },
  confirmedChip: {
    backgroundColor: '#E8F5E9',
  },
  pendingChip: {
    backgroundColor: '#FFF8E1',
  },
  viewDetails: {
    color: '#2D2B52',
    fontSize: 14,
    fontWeight: '500',
  },
  earningsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  earningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#666',
  },
  earningsValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2B52',
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#2D2B52',
  },
});
