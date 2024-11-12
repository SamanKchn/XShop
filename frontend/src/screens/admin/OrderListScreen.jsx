import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Chart from 'react-apexcharts';
import fa from 'apexcharts/dist/locales/fa.json';
import { useEffect, useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import DatePicker from 'react-modern-calendar-datepicker';
import { ORDERS_URL } from '../../constants';

const OrderListScreen = () => {
  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
  const [selectedDay, setSelectedDay] = useState(null);
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [filteredData, setfilteredData] = useState([]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // setWidth((window.innerWidth));
    setHeight((window.innerHeight * 35) / 100);
  }, []);
  // let daysfa=[];
  // for (let i = 0; i <7; i++) {
  //   var day = new Date();
  //   day.setDate(day.getDate()-i);
  //   day=day.toLocaleDateString("fa-IR-u-nu-latn")
  //   daysfa[i]=day;
  // }
  // const faoptions= {
  //   height:height,
  //   chart: {
  //     locales: [fa], //or multi language like [fa, en]
  //     defaultLocale: 'fa',
  //     toolbar: {
  //       tools: {
  //         download: false,
  //         selection: false,
  //         zoom: false,
  //         zoomin: false,
  //         zoomout: false,
  //         pan: false,
  //         reset: false ,
  //         customIcons: []
  //       },
  //       export: {
  //         csv: {
  //           filename: undefined,
  //           columnDelimiter: ',',
  //           headerCategory: 'category',
  //           headerValue: 'value',
  //           dateFormatter(timestamp) {
  //             return new Date(timestamp).toDateString()
  //           }
  //         },
  //         svg: {
  //           filename: undefined,
  //         },
  //         png: {
  //           filename: undefined,
  //         }
  //       },
  //       autoSelected: 'zoom'
  //     },
  //     type: 'area'
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: 'smooth'
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //     categories: daysfa,
  //     labels: {
  //       format: 'MM/dd',
  //       rotate: -45

  //     }
  //   },
  //   tooltip: {
  //     x: {
  //       format: 'yyyy/MM/dd'
  //     }
  //   },

  // }
  // const series= [{
  //   name: 'تعداد فروش',
  //   data: ChartData
  // }]
  const handleSubmit = async (ide) => {
    try {
      const response = await fetch(ORDERS_URL + '/' + ide + '/pay', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      refetch();

      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleSubmit2 = async (ide) => {
    try {
      const response = await fetch(ORDERS_URL + '/' + ide + '/deliver', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      refetch();
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <>
      <div style={{ height: '35%' }}>
        <h1>گزارش گیری</h1>
        <span className='mx-2'>از تاریخ </span>
        <input
          type='date'
          value={StartDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <span className='mx-2'> تا تاریخ </span>
        <input
          type='date'
          value={EndDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
        <Button
          onClick={(e) => {
            let tmp = [];
            for (let index = 0; index < orders.length; index++) {
              if (
                new Date(orders[index].createdAt.substring(0, 10)) >=
                  new Date(StartDate) &&
                new Date(orders[index].createdAt.substring(0, 10)) <=
                  new Date(EndDate)
              ) {
                tmp.push(orders[index]);
              }
              setfilteredData(tmp);
            }
          }}
          style={{ padding: 3, margin: 5, width: 160}}
          className='mx-3'
        >
          نمایش گزارش
        </Button>
        <div style={{ marginRight: '10%', marginTop: '5%' }}>
          {/* <Chart  width={1000} height={height} options={faoptions} series={series} type="area" />  */}
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>کاربر</th>
                <th>تاریخ</th>
                <th>جمع</th>
                <th>پرداخت</th>
                <th>تحویل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>تومان{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        جزییات
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div style={{ marginTop: 150, height: '65%' }}>
        <h1>همه سفارشات</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>شناسه</th>
                <th>کاربر</th>
                <th>تاریخ</th>
                <th>جمع</th>
                <th>تایید پرداخت</th>
                <th>تحویل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice} تومان</td>
                  <td>
                    {order.isPaid ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes
                        onClick={() => {
                          handleSubmit(order._id);
                        }}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes
                        onClick={() => {
                          handleSubmit2(order._id);
                        }}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        جزئیات
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
