export interface TestimoProps {
    name?: string;
    location?: string;
    comment?: string;
    image?: string;
}

const Testimo = ({ 
    name = "Ram Aryal", 
    location = "Basundhara, Kathmandu", 
    comment = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, minima?", 
    image 
}: TestimoProps) => {
    return (
        <div className="Testimonial-body bg-blue-600/5 w-100 h-50 rounded-xl mt-12 -ml-8 pl-6">
            <div className='Testimoni w-150 flex gap-4 pt-8'>
                <div className='h-20 w-20 border-2 rounded-full'>
                    {image && <img className='h-full w-full object-cover overflow-hidden rounded-full' src={image} alt={name} />}
                </div>
                <div className='pt-4'>
                    <p className="text-xl text-blue-700">{name}</p>
                    <p>{location}</p>
                </div>
            </div>
            <div className='content pt-4 pr-6 leading-relaxed'>{comment}</div>
        </div>
    )
}

export default Testimo