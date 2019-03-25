import RPi.GPIO as GPIO
import MFRC522
import signal
from textwrap import wrap

# Set root to <blank>
root="EZQMVPBWWXMMTNPZXRSAWIRWKWXKWAL9XRWCNFKZYYOHGKTBST9YKGGFX9WAMRUMGEJVGWIZHPJFGI9WL"


# Show main menu
print ("""
1. Display root stored on the card 
2. Write root to the cards
""")

# Get user selection
ans=input("What would you like to do? ")

continue_reading = True
       
# Capture SIGINT for cleanup when the script is aborted
def end_read(signal,frame):
    global continue_reading
    print "Ctrl+C captured, ending read."
    continue_reading = False
    GPIO.cleanup()

# Function to write root to the card
def write_root(root):
    
    # Add additional characters to root so that we have a total of 6x16 characters 
    root = root + '999999999999999'       

    # Convert root to a list of 6x16 characters  
    mylist = wrap(root, 16)

    # Write root over 6 separate blocks
    write_block(8, mylist[0])
    write_block(9, mylist[1])
    write_block(10, mylist[2])           
    write_block(12, mylist[3])
    write_block(13, mylist[4])
    write_block(14, mylist[5])


# Function to write single block to RFID tag
def write_block(blockID, str_data):

    status = MIFAREReader.MFRC522_Auth(MIFAREReader.PICC_AUTHENT1A, blockID, key, uid)
    
    if status == MIFAREReader.MI_OK:
        
        data=[]
        for letter in str_data:
            data.append(ord(letter))
        MIFAREReader.MFRC522_Write(blockID, data)
        
    else:
        print "Authentication error"


# Function that reads the root
def read_root():
    
    root = ""
    root = root + read_block(8)
    root = root + read_block(9)
    root = root + read_block(10)
    root = root + read_block(12)
    root = root + read_block(13)
    root = root + read_block(14)
    
    # Return the first 81 characters of the retrieved root
    return root[0:81]

# Function to read single block from RFID tag
def read_block(blockID):

    status = MIFAREReader.MFRC522_Auth(MIFAREReader.PICC_AUTHENT1A, blockID, key, uid)
    
    if status == MIFAREReader.MI_OK:
        
        str_data = ""
        int_data=(MIFAREReader.MFRC522_Read(blockID))
        print "int_data"
	print int_data
	print "block id %i" % blockID
	for number in int_data:
            str_data = str_data + chr(number)
        return str_data
        
    else:
        print "Authentication error"


# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()


# This loop keeps checking for near by RFID tags. If one is found it will get the UID and authenticate
while continue_reading:
       
    # Scan for cards    
    (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # If a card is found
    if status == MIFAREReader.MI_OK:
        print "Card detected"
    
    # Get the UID of the card
    (status,uid) = MIFAREReader.MFRC522_Anticoll()

    # If we have the UID, continue
    if status == MIFAREReader.MI_OK:

        # Print UID
        print "Card read UID: %s,%s,%s,%s" % (uid[0], uid[1], uid[2], uid[3])
    
        # This is the default key for authentication
        key = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]
        
        # Select the scanned tag
        MIFAREReader.MFRC522_SelectTag(uid)
        
        # Display root stored on the card    
        if ans==1:
            
            # Get root from card
            root=read_root()
            
            # Display root stored on the card
            print("\nThe card has the following root: ")
            print(root)
        
        # Write root to the card
        elif ans==2:
            
            # Write root to the card
            write_root(root)
            
            # Show end message
            print("\nThe following root was sucessfully added to the card")
            print(root[0:81])
           
        # Stop reading/writing to RFID tag
        MIFAREReader.MFRC522_StopCrypto1()
        
       
        # Make sure to stop reading for cards
        continue_reading = False
