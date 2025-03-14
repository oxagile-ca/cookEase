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
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Chip, Divider } from 'react-native-paper';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function UserDashboard() {
  const { colors } = useTheme();
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      chef_name: 'Chef Maria',
      booking_date: '2023-12-10',
      status: 'confirmed',
      location: 'Your Home',
    },
    {
      id: 2,
      chef_name: 'Chef Antonio',
      booking_date: '2023-12-24',
      status: 'pending',
      location: 'Your Home',
    },
  ]);
  const [featuredChefs, setFeaturedChefs] = useState([
    {
      id: 1,
      name: 'Chef Maria',
      rating: 4.9,
      specialty: 'Italian',
      image: require('../../../assets/chefs/chef1.jpg'),
    },
    {
      id: 2,
      name: 'Chef Antonio',
      rating: 4.7,
      specialty: 'Spanish',
      image: require('../../../assets/chefs/chef2.jpg'),
    },
    {
      id: 3,
      name: 'Chef Hiroshi',
      rating: 4.8,
      specialty: 'Japanese',
      image: require('../../../assets/chefs/chef3.jpg'),
    },
    {
      id: 4,
      name: 'Chef Amina',
      rating: 4.6,
      specialty: 'Moroccan',
      image: require('../../../assets/chefs/chef4.jpg'),
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
      name: 'Chicken fried rice',
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
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([
    {
      id: 1,
      name: 'Artisan',
      cuisine: 'European',
      location: 'Kurapushor, Sylhet',
      rating: 4.8,
      image: require('../../../assets/restaurants/restaurant1.jpg'),
    },
    {
      id: 2,
      name: 'Pritaj',
      cuisine: 'Bangladeshi',
      location: 'Zindabazar, Sylhet',
      rating: 4.6,
      image: require('../../../assets/restaurants/restaurant2.jpg'),
    },
    {
      id: 3,
      name: 'Mad Grill',
      cuisine: 'American',
      location: 'Raynogor',
      rating: 4.7,
      image: require('../../../assets/restaurants/restaurant3.jpg'),
    },
  ]);
  const [cart, setCart] = useState({
    items: [
      { id: 1, name: 'Special rice bowl', quantity: 1, price: 3.99 },
      { id: 2, name: 'Chicken fried rice', quantity: 1, price: 4.99 },
      { id: 3, name: 'Banana pie cake', quantity: 1, price: 2.99 },
    ],
    total: 11.97,
    deliveryFee: 0.0,
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
              placeholder="Search by food name / chef"
              placeholderTextColor="#999" 
            />
          </View>
          <Text style={styles.dateText}>{format(new Date(), 'do MMMM yyyy')}</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.profileName}>{userProfile?.full_name || 'Guest'}</Text>
            <Avatar.Image size={40} source={{ uri: userProfile?.avatar_url }} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchDashboardData} />
            }>
            <View style={styles.promoCard}>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Get free one large popcorn</Text>
                <Text style={styles.promoSubtitle}>
                  and one large fountain drink everytime you order over $30 or buy to rice bowl
                </Text>
              </View>
              <Image
                source={require('../../../assets/promo.png')}
                style={styles.promoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular this week</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>
                  Sort by <Ionicons name="chevron-down" size={16} />
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.dishesScroll}>
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
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Chefs</Text>
              <TouchableOpacity onPress={() => router.push('/chefs')}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chefsScroll}>
              {featuredChefs.map(chef => (
                <TouchableOpacity
                  key={chef.id}
                  style={styles.chefCard}
                  onPress={() => router.push(`/chefs/${chef.id}`)}>
                  <Image source={chef.image} style={styles.chefImage} />
                  <Text style={styles.chefName}>{chef.name}</Text>
                  <View style={styles.chefDetails}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.chefRating}>{chef.rating}</Text>
                    </View>
                    <Text style={styles.chefSpecialty}>{chef.specialty}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favourite restaurants</Text>
              <TouchableOpacity onPress={() => router.push('/restaurants')}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.restaurantsContainer}>
              {favoriteRestaurants.map(restaurant => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => router.push(`/restaurants/${restaurant.id}`)}>
                  <Image source={restaurant.image} style={styles.restaurantImage} />
                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                    <View style={styles.restaurantRating}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Ionicons
                          key={star}
                          name={star <= Math.floor(restaurant.rating) ? 'star' : 'star-outline'}
                          size={14}
                          color="#FFD700"
                          style={{ marginRight: 2 }}
                        />
                      ))}
                    </View>
                    <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
              <TouchableOpacity onPress={() => router.push('/bookings')}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            {upcomingBookings.map(booking => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.chefNameText}>{booking.chef_name}</Text>
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
                  <TouchableOpacity onPress={() => router.push(`/bookings/${booking.id}`)}>
                    <Text style={styles.viewDetails}>View details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.cartContainer}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>Your order summary</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {cart.items.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Image
                    source={popularDishes.find(dish => dish.name === item.name)?.image}
                    style={styles.cartItemImage}
                  />
                  <View>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                  </View>
                </View>
                <View style={styles.cartItemPricing}>
                  <Text style={styles.cartItemQuantity}>× {item.quantity}</Text>
                  <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </View>
            ))}

            <View style={styles.cartDelivery}>
              <Text style={styles.deliveryText}>free delivery</Text>
              <Text style={styles.deliveryPrice}>${cart.deliveryFee.toFixed(2)}</Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${cart.total.toFixed(2)}</Text>
            </View>

            <View style={styles.deliveryAddressContainer}>
              <Text style={styles.deliveryAddressTitle}>Your delivery address</Text>
              <View style={styles.addressRow}>
                <Ionicons name="location" size={18} color="#666" />
                <Text style={styles.addressText}>Uposhor, Sylhet</Text>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button
              mode="contained"
              style={styles.checkoutButton}
              onPress={() => router.push('/checkout')}>
              Checkout
            </Button>
          </View>
        </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollContent: {
    paddingBottom: 30,
    paddingRight: 20,
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
  chefsScroll: {
    marginBottom: 20,
  },
  chefCard: {
    width: 120,
    marginRight: 15,
    alignItems: 'center',
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  chefName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chefDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  chefRating: {
    fontSize: 12,
    marginLeft: 2,
  },
  chefSpecialty: {
    fontSize: 12,
    color: '#666',
  },
  restaurantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  restaurantCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 100,
  },
  restaurantInfo: {
    padding: 10,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  restaurantRating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  restaurantLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
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
  chefNameText: {
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
  cartContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginLeft: 20,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editText: {
    color: '#2D2B52',
    fontSize: 14,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cartItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  cartItemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartDelivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
  },
  deliveryPrice: {
    fontSize: 14,
  },
  divider: {
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2B52',
  },
  deliveryAddressContainer: {
    marginBottom: 20,
  },
  deliveryAddressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  checkoutButton: {
    backgroundColor: '#2D2B52',
  },
});
