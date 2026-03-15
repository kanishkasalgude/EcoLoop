from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    phone = Column(String(20))
    password_hash = Column(String(255))
    role = Column(String(20), default="consumer") # consumer, partner, admin
    eco_balance = Column(Float, default=0.0)
    city = Column(String(100))
    address = Column(String(255))
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    waste_scans = relationship("WasteScan", back_populates="user")
    pickup_requests = relationship("PickupRequest", foreign_keys="[PickupRequest.user_id]", back_populates="user")
    reward_transactions = relationship("RewardTransaction", back_populates="user")

class WasteItem(Base):
    __tablename__ = "waste_items"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50))
    material_type = Column(String(50))
    estimated_value = Column(Float)
    decomposition_time = Column(String(100))
    image_url = Column(String(255))
    recycling_steps = Column(JSON) # Store steps as JSON array
    tips = Column(Text)
    environmental_impact = Column(Text)

class WasteScan(Base):
    __tablename__ = "waste_scans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    waste_item_id = Column(Integer, ForeignKey("waste_items.id"))
    confidence = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="waste_scans")

class RecyclingCenter(Base):
    __tablename__ = "recycling_centers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    category = Column(String(50)) # general_scrap, e_waste, scrap_e_waste
    address = Column(String(255))
    area = Column(String(100))
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(20))
    latitude = Column(Float)
    longitude = Column(Float)
    phone = Column(String(50))
    rating = Column(Float, default=0.0)
    opening_hours = Column(String(100))
    accepted_materials = Column(Text) # comma separated or description
    description = Column(Text)
    is_verified = Column(Integer, default=0)

class MarketRate(Base):
    __tablename__ = "market_rates"
    
    id = Column(Integer, primary_key=True, index=True)
    item = Column(String(100))
    rate = Column(String(50)) # e.g. "₹35–41"
    unit = Column(String(20)) # kg, unit
    category = Column(String(50)) # Metal, Plastic, E-Waste
    updated_at = Column(DateTime, default=datetime.utcnow)

class PickupRequest(Base):
    __tablename__ = "pickup_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    partner_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Partner is also a user
    status = Column(String(20), default="requested") # requested, assigned, in_transit, completed, cancelled
    waste_type = Column(String(50))
    estimated_weight = Column(Float)
    actual_weight = Column(Float, nullable=True)
    tracking_qr = Column(String(100), unique=True)
    preferred_pickup_time = Column(DateTime)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id], back_populates="pickup_requests")

class RewardTransaction(Base):
    __tablename__ = "reward_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    transaction_type = Column(String(20)) # earn, redeem
    description = Column(String(255))
    pickup_request_id = Column(Integer, ForeignKey("pickup_requests.id"), nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="reward_transactions")
