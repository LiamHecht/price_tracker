import Header from "../components/header";


export default function About() {
    return (
        <>
            <Header />
            <div style={{
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>About Us</h1>
                <p style={{ fontSize: '24px', lineHeight: '1.6', marginBottom: '12px' }}>
                Welcome to our website! We are a team of passionate individuals dedicated to providing high-quality products and exceptional services.
                With years of experience in the industry, we strive to meet the needs and preferences of our customers.
                Our mission is to deliver innovative solutions that enhance your everyday life. 
                Whether you're looking for the latest gadgets, trendy fashion items, or reliable home essentials, we've got you covered.
                We pride ourselves on our commitment to customer satisfaction and guarantee a seamless shopping experience.
                Browse through our extensive collection, explore the exciting features, and find exactly what you're looking for. We're here to make your shopping journey enjoyable and hassle-free. Thank you for choosing us!
                </p>
            </div>
        </>
    )
}