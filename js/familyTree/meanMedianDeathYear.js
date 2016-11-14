$(document).ready(function() {
  c3.generate({
        bindto: '#meanMedianChart',
        data: {
            x: 'year',
            rows: [
                ['year', 'mean age', 'median age'],
                ['1745', '76', '76'],
                ['1750', '55', '55'],
                ['1755', '80', '80'],
                ['1765', '50', '50'],
                ['1767', '75', '75'],
                ['1768', '43', '43'],
                ['1770', '68', '68'],
                ['1773', '61', '61'],
                ['1774', '89', '89'],
                ['1776', '57', '57'],
                ['1778', '49', '49'],
                ['1779', '96', '96'],
                ['1780', '42', '42'],
                ['1781', '15', '15'],
                ['1782', '46', '46'],
                ['1789', '75', '75'],
                ['1790', '40', '40'],
                ['1791', '86', '86'],
                ['1794', '79', '79'],
                ['1795', '86', '86'],
                ['1796', '76', '76'],
                ['1797', '54', '54'],
                ['1798', '98', '98'],
                ['1801', '67', '67'],
                ['1804', '84', '84'],
                ['1806', '70', '70'],
                ['1807', '56', '56'],
                ['1808', '80', '80'],
                ['1810', '52', '52'],
                ['1811', '52', '52'],
                ['1812', '76', '76'],
                ['1813', '89', '89'],
                ['1815', '15', '15'],
                ['1816', '76', '82'],
                ['1818', '47', '47'],
                ['1819', '81', '81'],
                ['1820', '81', '81'],
                ['1821', '60', '65'],
                ['1822', '75', '74'],
                ['1823', '55', '55'],
                ['1824', '74', '76'],
                ['1825', '70', '75'],
                ['1826', '39', '39'],
                ['1827', '53', '57'],
                ['1828', '75', '75'],
                ['1829', '54', '54'],
                ['1830', '68', '76'],
                ['1831', '30', '30'],
                ['1832', '53', '63'],
                ['1833', '51', '50'],
                ['1834', '37', '37'],
                ['1835', '70', '68'],
                ['1836', '69', '70'],
                ['1837', '53', '51'],
                ['1838', '82', '82'],
                ['1839', '73', '77'],
                ['1840', '78', '76'],
                ['1841', '57', '64'],
                ['1842', '59', '61'],
                ['1843', '72', '72'],
                ['1844', '62', '73'],
                ['1845', '55', '63'],
                ['1846', '47', '55'],
                ['1847', '77', '75'],
                ['1848', '69', '76'],
                ['1849', '83', '83'],
                ['1850', '59', '62'],
                ['1851', '39', '34'],
                ['1852', '71', '77'],
                ['1853', '57', '73'],
                ['1854', '67', '80'],
                ['1855', '69', '70'],
                ['1856', '63', '77'],
                ['1857', '61', '74'],
                ['1858', '62', '70'],
                ['1859', '69', '71'],
                ['1860', '54', '64'],
                ['1861', '54', '59'],
                ['1862', '82', '81'],
                ['1863', '48', '63'],
                ['1864', '62', '64'],
                ['1865', '78', '79'],
                ['1866', '78', '77'],
                ['1867', '69', '72'],
                ['1868', '73', '71'],
                ['1869', '58', '57'],
                ['1870', '54', '78'],
                ['1871', '75', '75'],
                ['1872', '67', '76'],
                ['1873', '68', '69'],
                ['1874', '49', '59'],
                ['1875', '63', '65'],
                ['1876', '55', '62'],
                ['1877', '55', '64'],
                ['1878', '60', '62'],
                ['1879', '53', '64'],
                ['1880', '72', '72'],
                ['1881', '59', '62'],
                ['1882', '63', '69'],
                ['1883', '53', '69'],
                ['1884', '59', '73'],
                ['1885', '57', '69'],
                ['1886', '67', '71'],
                ['1887', '59', '79'],
                ['1888', '78', '79'],
                ['1889', '58', '74'],
                ['1890', '68', '67'],
                ['1891', '71', '75'],
                ['1892', '77', '80'],
                ['1893', '36', '36'],
                ['1894', '70', '76'],
                ['1895', '50', '57'],
                ['1896', '58', '63'],
                ['1897', '75', '75'],
                ['1898', '54', '75'],
                ['1899', '11', '11'],
                ['1900', '56', '69'],
                ['1901', '39', '38'],
                ['1902', '65', '73'],
                ['1903', '69', '70'],
                ['1904', '43', '42'],
                ['1905', '19', '15'],
                ['1906', '65', '65'],
                ['1907', '66', '67'],
                ['1908', '42', '44'],
                ['1909', '76', '83'],
                ['1910', '32', '33'],
                ['1911', '65', '60'],
                ['1912', '56', '55'],
                ['1913', '64', '64'],
                ['1914', '54', '56'],
                ['1915', '61', '65'],
                ['1916', '80', '80'],
                ['1917', '60', '60'],
                ['1918', '75', '75'],
                ['1919', '60', '60'],
                ['1920', '72', '72'],
                ['1921', '53', '60'],
                ['1922', '63', '74'],
                ['1923', '37', '42'],
                ['1925', '65', '71'],
                ['1926', '76', '76'],
                ['1927', '34', '34'],
                ['1928', '37', '37'],
                ['1929', '71', '71'],
                ['1930', '66', '74'],
                ['1931', '83', '83'],
                ['1932', '29', '29'],
                ['1933', '0', '0'],
                ['1934', '37', '41'],
                ['1936', '59', '59'],
                ['1937', '0', '0'],
                ['1939', '22', '22'],
                ['1941', '0', '0'],
                ['1944', '0', '0'],
                ['1945', '48', '48'],
                ['1946', '21', '21'],
                ['1947', '44', '44'],
                ['1951', '4', '4'],
                ['1953', '58', '58'],
                ['1959', '45', '45']
            ],
            type: 'spline'
        },
        axis: {
            x: {
                label: {
                    text: 'birth year',
                    position: 'outer-center'
                }
            },
            y: {
                label: {
                    text: 'age at death',
                    position: 'outer-middle'
                }
            }
        }
    });
  });
