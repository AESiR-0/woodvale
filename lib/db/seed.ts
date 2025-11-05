import { db, users, tables, menuItems } from './index';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await db.insert(users).values({
      email: 'admin@woodvale.com',
      password: hashedPassword,
      name: 'Woodvale Admin',
      role: 'admin',
      isActive: true,
    }).returning();

    console.log('✅ Admin user created:', admin[0].email);

    // Create manager user
    const managerPassword = await bcrypt.hash('manager123', 10);
    
    const manager = await db.insert(users).values({
      email: 'manager@woodvale.com',
      password: managerPassword,
      name: 'Restaurant Manager',
      role: 'manager',
      isActive: true,
    }).returning();

    console.log('✅ Manager user created:', manager[0].email);

    // Create sample tables
    const tablesData = [
      { number: 1, capacity: 2, location: 'Main Dining', status: 'available' as const },
      { number: 2, capacity: 4, location: 'Main Dining', status: 'available' as const },
      { number: 3, capacity: 4, location: 'Main Dining', status: 'available' as const },
      { number: 4, capacity: 6, location: 'Main Dining', status: 'available' as const },
      { number: 5, capacity: 8, location: 'Main Dining', status: 'available' as const },
      { number: 6, capacity: 2, location: 'Patio', status: 'available' as const },
      { number: 7, capacity: 4, location: 'Patio', status: 'available' as const },
      { number: 8, capacity: 6, location: 'Patio', status: 'available' as const },
      { number: 9, capacity: 4, location: 'Private Room', status: 'available' as const },
      { number: 10, capacity: 12, location: 'Private Room', status: 'available' as const },
    ];

    for (const tableData of tablesData) {
      await db.insert(tables).values(tableData);
    }

    console.log('✅ Tables created');

    // Create sample menu items
    const menuData = [
      {
        name: 'Soup of the Day',
        subtitle: "Chef's Selection",
        category: 'appetizers',
        description: 'Ask your server for today\'s selection',
        price: '10.00',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
        mainImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
        rating: '4.5',
        chef: 'Chef Johnson',
        chefTitle: 'Executive Chef',
      },
      {
        name: 'Caesar Salad',
        subtitle: 'Classic Roman',
        category: 'appetizers',
        description: 'Romaine hearts / house dressing / shaved parmesan / capers / grilled lemon / garlic herb crouton',
        price: '11.00',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        mainImage: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
        rating: '4.6',
        chef: 'Chef Maria',
        chefTitle: 'Salad Specialist',
      },
      {
        name: 'Beef Tenderloin',
        subtitle: 'Ash Crusted',
        category: 'entrees',
        description: '6oz ash crusted beef tenderloin / wild mushroom and truffle puree / glazed heirloom carrots / thyme and black garlic jus',
        price: '59.00',
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
        mainImage: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop',
        rating: '4.9',
        chef: 'Chef Laurent',
        chefTitle: 'Master Butcher',
      },
      {
        name: 'Spruced Old Fashioned',
        subtitle: 'Cocktail',
        category: 'drinks',
        description: 'Bourbon / raw sugar / angostura bitters / orange / smoked',
        price: '15.00',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop',
        mainImage: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
        rating: '4.8',
        chef: 'Bartender Alex',
        chefTitle: 'Mixology Master',
      },
    ];

    for (const item of menuData) {
      await db.insert(menuItems).values(item);
    }

    console.log('✅ Menu items created');

    console.log('🎉 Database seed completed successfully!');
    console.log('');
    console.log('👤 Admin Login:');
    console.log('   Email: admin@woodvale.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('👤 Manager Login:');
    console.log('   Email: manager@woodvale.com');
    console.log('   Password: manager123');

  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  }
}
