interface StatCardProps {
  name: string;
  value: string;
  option: string;
}

export default function StatsCard({ name, value, option }: StatCardProps) {
  return (
    <div className = 'stats'>
        <p className = 'stats-name'>{name}</p>
        <h1>{value}</h1>
        <p className = 'stats-options'>{option}</p>

        <style> {`
            .stats {       
                background-color: white;
                width: 350px;
                height: 140px;
                padding: 20px 20px 20px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
            .stats-name {
                font-size: 16px;
                margin-bottom: -8px;
            }
            .stats-options {
                font-weight: bold;
                font-size: 14px;
                color: #00C49F;
                margin-top: -8px;
                cursor: pointer;
                }
            .stats-options:hover {
                text-decoration: underline;
            }
        `}</style>
    </div>
  );
};
