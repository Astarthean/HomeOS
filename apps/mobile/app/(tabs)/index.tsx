import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Shield, Smartphone, Zap, Layout, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header/Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBadge}
          />
          <Text style={styles.heroSubtitle}>NUESTRO RINCÓN DIGITAL</Text>
          <Text style={styles.heroTitle}>¡Hola de nuevo! {'\n'}
            <Text style={styles.brandText}>HomeOS</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Gestiona los gastos de casa y tus finanzas en pareja de forma sencilla y segura.
          </Text>

          <View style={styles.buttonGroup}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Empezar Ahora</Text>
                <ChevronRight color="#fff" size={20} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Todo en Orden</Text>
          <View style={styles.featuresGrid}>
            {[
              { title: "Seguro", icon: Shield, color: "#3B82F6" },
              { title: "Nativo", icon: Smartphone, color: "#EC4899" },
              { title: "Rápido", icon: Zap, color: "#F59E0B" },
              { title: "Pareja", icon: Layout, color: "#8B5CF6" }
            ].map((f, i) => (
              <View key={i} style={styles.featureCard}>
                <View style={[styles.iconContainer, { backgroundColor: f.color + '15' }]}>
                  <f.icon color={f.color} size={24} />
                </View>
                <Text style={styles.featureLabel}>{f.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Status Card (Placeholder) */}
        <View style={styles.statusSection}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusDot} />
              <Text style={styles.statusTitle}>Estado del Hogar</Text>
            </View>
            <Text style={styles.statusBody}>
              Todo está funcionando bien. Las finanzas compartidas y tu perfil personal están sincronizados.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    textAlign: 'center',
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    marginBottom: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  heroSubtitle: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 48,
  },
  brandText: {
    color: '#3B82F6',
  },
  heroDescription: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    maxWidth: '85%',
  },
  buttonGroup: {
    marginTop: 32,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresSection: {
    marginTop: 48,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  statusCard: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusBody: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 22,
  },
});
